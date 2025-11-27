import { useState, useEffect, useCallback, useRef } from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'

// Game constants
const GAME_WIDTH = 480
const GAME_HEIGHT = 420
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 32
const BULLET_SIZE = 16
const BUG_WIDTH = 28
const BUG_HEIGHT = 24

interface Bullet {
  id: number
  x: number
  y: number
  letter: string
}

interface Bug {
  id: number
  x: number
  y: number
  type: number
  speed: number
  wobble: number
  alive: boolean
}

interface Splat {
  id: number
  x: number
  y: number
  frame: number
  color: string
}

interface GameState {
  playerX: number
  bullets: Bullet[]
  bugs: Bug[]
  splats: Splat[]
  score: number
  lives: number
  level: number
  spawnTimer: number
  status: 'menu' | 'playing' | 'gameover'
}

const BUG_COLORS = ['#50fa7b', '#ff79c6', '#8be9fd', '#ffb86c', '#ff5555', '#bd93f9']
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const getRandomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)]

const createBug = (id: number, level: number): Bug => ({
  id,
  x: Math.random() * (GAME_WIDTH - BUG_WIDTH),
  y: -BUG_HEIGHT,
  type: Math.floor(Math.random() * 6),
  speed: 1.5 + Math.random() * 1.5 + level * 0.3,
  wobble: Math.random() * Math.PI * 2,
  alive: true
})

const createInitialState = (): GameState => ({
  playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
  bullets: [],
  bugs: [],
  splats: [],
  score: 0,
  lives: 3,
  level: 1,
  spawnTimer: 0,
  status: 'menu'
})

const BugSquasher = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState)
  const [highScore, setHighScore] = useState(0)

  const gameStateRef = useRef<GameState>(gameState)
  const highScoreRef = useRef(0)
  const keysPressed = useRef<Set<string>>(new Set())
  const bulletIdRef = useRef(0)
  const splatIdRef = useRef(0)
  const bugIdRef = useRef(0)
  const lastShotRef = useRef(0)
  const frameCountRef = useRef(0)

  // Start game function
  const startGame = useCallback(() => {
    bugIdRef.current = 0
    const newState: GameState = {
      playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
      bullets: [],
      bugs: [],
      splats: [],
      score: 0,
      lives: 3,
      level: 1,
      spawnTimer: 0,
      status: 'playing'
    }
    gameStateRef.current = newState
    setGameState(newState)
  }, [])

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)
      if (e.key === 'Enter' && gameStateRef.current.status !== 'playing') {
        startGame()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [startGame])

  // Main game loop - all game logic in one place
  useEffect(() => {
    let animationId: number

    const gameLoop = () => {
      const state = gameStateRef.current
      frameCountRef.current++

      if (state.status !== 'playing') {
        animationId = requestAnimationFrame(gameLoop)
        return
      }

      // Create a mutable copy of state for this frame
      const newState: GameState = {
        ...state,
        bullets: [...state.bullets],
        bugs: [...state.bugs],
        splats: [...state.splats]
      }

      // Player movement
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
        newState.playerX = Math.max(0, newState.playerX - 6)
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
        newState.playerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, newState.playerX + 6)
      }

      // Player shooting
      if (keysPressed.current.has(' ')) {
        const now = Date.now()
        if (now - lastShotRef.current >= 150) {
          lastShotRef.current = now
          newState.bullets.push({
            id: bulletIdRef.current++,
            x: newState.playerX + PLAYER_WIDTH / 2 - BULLET_SIZE / 2,
            y: GAME_HEIGHT - PLAYER_HEIGHT - 30,
            letter: getRandomLetter()
          })
        }
      }

      // Update bullets positions
      newState.bullets = newState.bullets
        .map(b => ({ ...b, y: b.y - 10 }))
        .filter(b => b.y > -BULLET_SIZE)

      // Update splats
      newState.splats = newState.splats
        .map(s => ({ ...s, frame: s.frame + 1 }))
        .filter(s => s.frame < 15)

      // Spawn bugs
      newState.spawnTimer++
      const spawnRate = Math.max(30, 80 - newState.level * 5)
      if (newState.spawnTimer >= spawnRate) {
        newState.spawnTimer = 0
        newState.bugs.push(createBug(bugIdRef.current++, newState.level))
      }

      // Update bugs - move down with wobble
      newState.bugs = newState.bugs.map(bug => ({
        ...bug,
        y: bug.y + bug.speed,
        wobble: bug.wobble + 0.1,
        x: bug.x + Math.sin(bug.wobble) * 1.5
      }))

      // Collision detection: bullets hitting bugs
      const bulletsToRemove = new Set<number>()

      for (const bullet of newState.bullets) {
        for (let i = 0; i < newState.bugs.length; i++) {
          const bug = newState.bugs[i]
          if (!bug.alive) continue

          if (
            bullet.x < bug.x + BUG_WIDTH &&
            bullet.x + BULLET_SIZE > bug.x &&
            bullet.y < bug.y + BUG_HEIGHT &&
            bullet.y + BULLET_SIZE > bug.y
          ) {
            bulletsToRemove.add(bullet.id)
            newState.bugs[i] = { ...bug, alive: false }
            newState.splats.push({
              id: splatIdRef.current++,
              x: bug.x + BUG_WIDTH / 2,
              y: bug.y + BUG_HEIGHT / 2,
              frame: 0,
              color: BUG_COLORS[bug.type]
            })
            newState.score += 10 + newState.level * 2

            if (newState.score > highScoreRef.current) {
              highScoreRef.current = newState.score
            }
            break
          }
        }
      }

      if (bulletsToRemove.size > 0) {
        newState.bullets = newState.bullets.filter(b => !bulletsToRemove.has(b.id))
      }

      // Remove dead bugs
      newState.bugs = newState.bugs.filter(b => b.alive)

      // Check if bugs reached keyboard (player)
      for (const bug of newState.bugs) {
        if (bug.y + BUG_HEIGHT >= GAME_HEIGHT - PLAYER_HEIGHT - 10) {
          newState.bugs = newState.bugs.filter(b => b.id !== bug.id)
          newState.splats.push({
            id: splatIdRef.current++,
            x: bug.x + BUG_WIDTH / 2,
            y: GAME_HEIGHT - PLAYER_HEIGHT,
            frame: 0,
            color: '#ff5555'
          })
          newState.lives -= 1
          if (newState.lives <= 0) {
            newState.status = 'gameover'
          }
        }
      }

      // Level up every 150 points
      const newLevel = Math.floor(newState.score / 150) + 1
      if (newLevel > newState.level) {
        newState.level = newLevel
      }

      // Update refs and trigger render
      gameStateRef.current = newState
      setGameState(newState)
      setHighScore(highScoreRef.current)

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Bug sprite renderer - different bug types!
  const renderBug = (type: number) => {
    const color = BUG_COLORS[type]

    // Beetle
    if (type === 0) {
      return (
        <svg viewBox="0 0 28 24" width="28" height="24">
          <ellipse cx="14" cy="14" rx="10" ry="8" fill={color} />
          <line x1="14" y1="6" x2="14" y2="22" stroke="#282a36" strokeWidth="1" />
          <circle cx="14" cy="5" r="5" fill={color} />
          <circle cx="11" cy="4" r="2" fill="#282a36" />
          <circle cx="17" cy="4" r="2" fill="#282a36" />
          <circle cx="11.5" cy="3.5" r="0.8" fill="#fff" />
          <circle cx="17.5" cy="3.5" r="0.8" fill="#fff" />
          <line x1="10" y1="1" x2="6" y2="-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="1" x2="22" y2="-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {[8, 12, 16].map(y => (
            <g key={y}>
              <line x1="5" y1={y} x2="0" y2={y - 2} stroke="#282a36" strokeWidth="1.5" />
              <line x1="23" y1={y} x2="28" y2={y - 2} stroke="#282a36" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      )
    }

    // Spider
    if (type === 1) {
      return (
        <svg viewBox="0 0 28 24" width="28" height="24">
          <circle cx="14" cy="14" r="7" fill={color} />
          <circle cx="14" cy="6" r="5" fill={color} />
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <path d={`M${6 - i} ${8 + i * 3} Q${-2 - i} ${4 + i * 3} ${-4 + i} ${10 + i * 4}`} stroke="#282a36" strokeWidth="1.5" fill="none" />
              <path d={`M${22 + i} ${8 + i * 3} Q${30 + i} ${4 + i * 3} ${32 - i} ${10 + i * 4}`} stroke="#282a36" strokeWidth="1.5" fill="none" />
            </g>
          ))}
          {[10, 12, 14, 16].map((cx, i) => (
            <circle key={i} cx={cx} cy="5" r="1.5" fill="#282a36" />
          ))}
          <circle cx="11" cy="5" r="0.5" fill="#ff5555" />
          <circle cx="17" cy="5" r="0.5" fill="#ff5555" />
        </svg>
      )
    }

    // Ladybug
    if (type === 2) {
      return (
        <svg viewBox="0 0 28 24" width="28" height="24">
          <ellipse cx="14" cy="14" rx="10" ry="9" fill="#ff5555" />
          <line x1="14" y1="5" x2="14" y2="23" stroke="#282a36" strokeWidth="2" />
          <circle cx="9" cy="11" r="2" fill="#282a36" />
          <circle cx="19" cy="11" r="2" fill="#282a36" />
          <circle cx="8" cy="17" r="2" fill="#282a36" />
          <circle cx="20" cy="17" r="2" fill="#282a36" />
          <circle cx="14" cy="19" r="1.5" fill="#282a36" />
          <circle cx="14" cy="4" r="4" fill="#282a36" />
          <circle cx="12" cy="3" r="1" fill="#fff" />
          <circle cx="16" cy="3" r="1" fill="#fff" />
          <line x1="11" y1="0" x2="9" y2="-3" stroke="#282a36" strokeWidth="1.5" />
          <line x1="17" y1="0" x2="19" y2="-3" stroke="#282a36" strokeWidth="1.5" />
        </svg>
      )
    }

    // Caterpillar
    if (type === 3) {
      return (
        <svg viewBox="0 0 28 24" width="28" height="24">
          {[0, 1, 2, 3, 4].map(i => (
            <circle key={i} cx={4 + i * 5} cy={14 + Math.sin(i) * 2} r="4" fill={color} opacity={1 - i * 0.1} />
          ))}
          <circle cx="4" cy="14" r="5" fill={color} />
          <circle cx="2" cy="12" r="1.5" fill="#282a36" />
          <circle cx="6" cy="12" r="1.5" fill="#282a36" />
          <circle cx="2.3" cy="11.7" r="0.5" fill="#fff" />
          <circle cx="6.3" cy="11.7" r="0.5" fill="#fff" />
          <line x1="2" y1="8" x2="0" y2="5" stroke={color} strokeWidth="1.5" />
          <line x1="6" y1="8" x2="8" y2="5" stroke={color} strokeWidth="1.5" />
          <circle cx="0" cy="5" r="1" fill={color} />
          <circle cx="8" cy="5" r="1" fill={color} />
          {[0, 1, 2, 3, 4].map(i => (
            <g key={i}>
              <line x1={4 + i * 5 - 2} y1={18 + Math.sin(i) * 2} x2={4 + i * 5 - 3} y2={22} stroke="#282a36" strokeWidth="1" />
              <line x1={4 + i * 5 + 2} y1={18 + Math.sin(i) * 2} x2={4 + i * 5 + 3} y2={22} stroke="#282a36" strokeWidth="1" />
            </g>
          ))}
        </svg>
      )
    }

    // Ant
    if (type === 4) {
      return (
        <svg viewBox="0 0 28 24" width="28" height="24">
          <ellipse cx="14" cy="18" rx="5" ry="4" fill={color} />
          <ellipse cx="14" cy="12" rx="3" ry="3" fill={color} />
          <circle cx="14" cy="6" r="4" fill={color} />
          <circle cx="12" cy="5" r="1.5" fill="#282a36" />
          <circle cx="16" cy="5" r="1.5" fill="#282a36" />
          <line x1="11" y1="2" x2="8" y2="-1" stroke={color} strokeWidth="1.5" />
          <line x1="17" y1="2" x2="20" y2="-1" stroke={color} strokeWidth="1.5" />
          {[-1, 0, 1].map(i => (
            <g key={i}>
              <line x1="11" y1={12 + i * 2} x2="4" y2={10 + i * 3} stroke="#282a36" strokeWidth="1.5" />
              <line x1="17" y1={12 + i * 2} x2="24" y2={10 + i * 3} stroke="#282a36" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      )
    }

    // Fly (default)
    return (
      <svg viewBox="0 0 28 24" width="28" height="24">
        <ellipse cx="14" cy="16" rx="6" ry="5" fill={color} />
        <circle cx="14" cy="8" r="5" fill={color} />
        <circle cx="11" cy="7" r="2.5" fill="#ff5555" />
        <circle cx="17" cy="7" r="2.5" fill="#ff5555" />
        <circle cx="11" cy="7" r="1" fill="#282a36" />
        <circle cx="17" cy="7" r="1" fill="#282a36" />
        <ellipse cx="6" cy="12" rx="5" ry="3" fill="rgba(139,233,253,0.4)" transform="rotate(-30 6 12)" />
        <ellipse cx="22" cy="12" rx="5" ry="3" fill="rgba(139,233,253,0.4)" transform="rotate(30 22 12)" />
        <line x1="14" y1="21" x2="12" y2="25" stroke="#282a36" strokeWidth="1" />
        <line x1="14" y1="21" x2="16" y2="25" stroke="#282a36" strokeWidth="1" />
      </svg>
    )
  }

  // Keyboard renderer - now with animated typing effect
  const renderKeyboard = () => {
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    return (
      <svg viewBox="0 0 80 32" width="80" height="32">
        {/* Keyboard base with gradient */}
        <defs>
          <linearGradient id="keyboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6272a4" />
            <stop offset="100%" stopColor="#44475a" />
          </linearGradient>
          <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8be9fd" />
            <stop offset="50%" stopColor="#6272a4" />
            <stop offset="100%" stopColor="#44475a" />
          </linearGradient>
        </defs>
        <rect x="0" y="2" width="80" height="30" rx="4" fill="url(#keyboardGrad)" />
        <rect x="2" y="4" width="76" height="26" rx="3" fill="#282a36" />
        {/* Row 1 */}
        {row1.map((key, i) => (
          <g key={key}>
            <rect
              x={4 + i * 7.2}
              y="6"
              width="6"
              height="6"
              rx="1"
              fill="url(#keyGrad)"
              opacity="0.8"
            />
            <text
              x={7 + i * 7.2}
              y="11"
              fontSize="4"
              fill="#f8f8f2"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {key}
            </text>
          </g>
        ))}
        {/* Row 2 */}
        {row2.map((key, i) => (
          <g key={key}>
            <rect
              x={7 + i * 7.2}
              y="13"
              width="6"
              height="6"
              rx="1"
              fill="#6272a4"
              opacity="0.7"
            />
            <text
              x={10 + i * 7.2}
              y="18"
              fontSize="4"
              fill="#f8f8f2"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {key}
            </text>
          </g>
        ))}
        {/* Space bar with glow */}
        <rect x="15" y="20" width="50" height="6" rx="2" fill="#50fa7b" />
        <rect x="15" y="20" width="50" height="6" rx="2" fill="none" stroke="#8be9fd" strokeWidth="0.5" opacity="0.8" />
        <text x="40" y="25" fontSize="4" fill="#282a36" textAnchor="middle" fontFamily="monospace">SPACE</text>
        {/* Outer glow */}
        <rect x="0" y="2" width="80" height="30" rx="4" fill="none" stroke="#50fa7b" strokeWidth="1.5" opacity="0.6" />
        <rect x="0" y="2" width="80" height="30" rx="4" fill="none" stroke="#8be9fd" strokeWidth="0.5" opacity="0.4" />
      </svg>
    )
  }

  const { playerX, bullets, bugs, splats, score, lives, level, status } = gameState

  return (
    <>
      <div id="window-header">
        <WindowControls target='BugSquasher' />
        <h2 className="font-bold text-sm text-center w-full">Bug Squasher</h2>
      </div>
      <div style={{
        width: '100%',
        height: 'calc(100% - 32px)',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Binary rain background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 20px,
            rgba(80, 250, 123, 0.1) 20px,
            rgba(80, 250, 123, 0.1) 21px
          )`,
          pointerEvents: 'none'
        }} />

        {/* Floating code symbols */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              color: 'rgba(98, 114, 164, 0.3)',
              fontSize: '12px',
              fontFamily: 'monospace',
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            {['{ }', '< />', '( )', '[ ]', '/*', '*/'][i % 6]}
          </div>
        ))}

        {/* HUD */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          color: '#fff',
          fontSize: '10px',
          zIndex: 5
        }}>
          <div>
            <div style={{ color: '#ff79c6', marginBottom: 4 }}>BUGS SQUASHED</div>
            <div style={{ color: '#50fa7b' }}>{score.toString().padStart(5, '0')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ff79c6', marginBottom: 4 }}>HI-SCORE</div>
            <div style={{ color: '#f1fa8c' }}>{highScore.toString().padStart(5, '0')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#ff79c6', marginBottom: 4 }}>KEYBOARDS</div>
            <div style={{ color: '#8be9fd' }}>{'⌨'.repeat(lives)}</div>
          </div>
        </div>

        {/* Level indicator */}
        {status === 'playing' && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 30,
            color: '#bd93f9',
            fontSize: '8px',
            zIndex: 5
          }}>
            DEBUG LEVEL {level}
          </div>
        )}

        {/* Game area */}
        <div style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          position: 'relative',
          border: '2px solid #44475a',
          borderRadius: 8,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(40,42,54,0.9) 0%, rgba(68,71,90,0.9) 100%)',
          boxShadow: '0 0 30px rgba(139, 233, 253, 0.2), inset 0 0 60px rgba(0,0,0,0.5)'
        }}>
          {status === 'menu' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#fff',
              zIndex: 20
            }}>
              <div style={{
                fontSize: '20px',
                color: '#ff5555',
                textShadow: '0 0 10px #ff5555',
                marginBottom: 10
              }}>
                🐛 BUG
              </div>
              <div style={{
                fontSize: '20px',
                color: '#50fa7b',
                textShadow: '0 0 10px #50fa7b',
                marginBottom: 30,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                SQUASHER ⌨
              </div>
              <div style={{ fontSize: '7px', color: '#8be9fd', marginBottom: 15, lineHeight: 1.8 }}>
                Bugs are invading your keyboard!<br />
                Shoot them with letters before<br />
                they crash your system!
              </div>
              <div style={{ fontSize: '8px', color: '#ffb86c', marginBottom: 20 }}>
                ← → to move | SPACE to type
              </div>
              <div style={{
                fontSize: '10px',
                color: '#f1fa8c',
                animation: 'blink 1s step-end infinite'
              }}>
                PRESS ENTER TO DEBUG
              </div>
            </div>
          )}

          {status === 'gameover' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#fff',
              zIndex: 20
            }}>
              <div style={{
                fontSize: '16px',
                color: '#ff5555',
                textShadow: '0 0 10px #ff5555',
                marginBottom: 10
              }}>
                SYSTEM CRASH
              </div>
              <div style={{
                fontSize: '12px',
                color: '#ff79c6',
                marginBottom: 20
              }}>
                Bugs overwhelmed<br />your keyboard!
              </div>
              <div style={{ fontSize: '10px', color: '#f8f8f2', marginBottom: 10 }}>
                BUGS SQUASHED: {score}
              </div>
              <div style={{
                fontSize: '8px',
                color: '#f1fa8c',
                animation: 'blink 1s step-end infinite',
                marginTop: 20
              }}>
                PRESS ENTER TO REBOOT
              </div>
            </div>
          )}

          {status === 'playing' && (
            <>
              {/* Bugs */}
              {bugs.map(bug => (
                <div
                  key={bug.id}
                  style={{
                    position: 'absolute',
                    left: bug.x,
                    top: bug.y,
                    width: BUG_WIDTH,
                    height: BUG_HEIGHT,
                    transform: `rotate(${Math.sin(bug.wobble) * 10}deg)`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                  }}
                >
                  {renderBug(bug.type)}
                </div>
              ))}

              {/* Letter Bullets */}
              {bullets.map(bullet => {
                const bulletColors = ['#50fa7b', '#ff79c6', '#8be9fd', '#f1fa8c', '#ffb86c']
                const bulletColor = bulletColors[bullet.letter.charCodeAt(0) % bulletColors.length]
                return (
                  <div
                    key={bullet.id}
                    style={{
                      position: 'absolute',
                      left: bullet.x,
                      top: bullet.y,
                      width: BULLET_SIZE,
                      height: BULLET_SIZE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: '"Courier New", monospace',
                      color: bulletColor,
                      textShadow: `0 0 8px ${bulletColor}, 0 0 15px ${bulletColor}`,
                      transform: `rotate(${(bullet.y * 3) % 360}deg)`
                    }}
                  >
                    {bullet.letter}
                  </div>
                )
              })}

              {/* Splats with letter debris */}
              {splats.map(splat => (
                <div
                  key={splat.id}
                  style={{
                    position: 'absolute',
                    left: splat.x - 25,
                    top: splat.y - 25,
                    width: 50,
                    height: 50,
                    opacity: 1 - splat.frame / 15,
                    transform: `scale(${1 + splat.frame * 0.1})`
                  }}
                >
                  <svg viewBox="0 0 50 50" width="50" height="50">
                    {/* Main splat */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <ellipse
                        key={i}
                        cx={25 + Math.cos(angle * Math.PI / 180) * (10 + splat.frame * 1.5)}
                        cy={25 + Math.sin(angle * Math.PI / 180) * (10 + splat.frame * 1.5)}
                        rx={5 - splat.frame * 0.3}
                        ry={7 - splat.frame * 0.4}
                        fill={splat.color}
                        transform={`rotate(${angle} ${25 + Math.cos(angle * Math.PI / 180) * (10 + splat.frame * 1.5)} ${25 + Math.sin(angle * Math.PI / 180) * (10 + splat.frame * 1.5)})`}
                      />
                    ))}
                    <circle cx="25" cy="25" r={12 - splat.frame * 0.6} fill={splat.color} />
                    {/* Flying letters */}
                    {['!', '@', '#', '$'].map((char, i) => (
                      <text
                        key={i}
                        x={25 + Math.cos((i * 90 + splat.frame * 10) * Math.PI / 180) * (splat.frame * 2)}
                        y={25 + Math.sin((i * 90 + splat.frame * 10) * Math.PI / 180) * (splat.frame * 2)}
                        fontSize="6"
                        fill="#f8f8f2"
                        textAnchor="middle"
                        opacity={1 - splat.frame / 15}
                      >
                        {char}
                      </text>
                    ))}
                  </svg>
                </div>
              ))}

              {/* Keyboard (Player) */}
              <div style={{
                position: 'absolute',
                left: playerX,
                bottom: 10,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
              }}>
                {renderKeyboard()}
              </div>
            </>
          )}
        </div>

        {/* Controls hint */}
        {status === 'playing' && (
          <div style={{
            marginTop: 10,
            fontSize: '6px',
            color: '#6272a4',
            letterSpacing: 1
          }}>
            ← → MOVE &nbsp;&nbsp; SPACE TYPE LETTERS
          </div>
        )}

        <style>{`
          @keyframes blink {
            50% { opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(2deg); }
            50% { transform: translateY(-10px) rotate(0deg); }
            75% { transform: translateY(-5px) rotate(-2deg); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
            50% { filter: drop-shadow(0 0 15px currentColor); }
          }
        `}</style>
      </div>
    </>
  )
}

const BugSquasherWindow = WindowWrapper(BugSquasher, 'BugSquasher')
export default BugSquasherWindow