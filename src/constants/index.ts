const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/network-wireless.svg", // network-wireless-signal-good
    },
    {
        id: 2,
        img: "/icons/system-search.svg", // system-search or edit-find
    },
    {
        id: 3,
        img: "/icons/avatar.svg", // avatar-default or system-users
    },
    {
        id: 4,
        img: "/icons/system-settings.svg", // preferences-system or emblem-system
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // Files/Nautilus
        icon: "computer.svg", // system-file-manager or org.gnome.Nautilus
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // Web Browser
        icon: "text-html.svg", // web-browser or org.gnome.Epiphany
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // Photos/Loupe
        icon: "photos.svg", // org.gnome.Photos or image-x-generic
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // Contacts
        icon: "x-office-addressbook.svg", // x-office-address-book or org.gnome.Contacts
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // Terminal
        icon: "ebook-reader.svg", // utilities-terminal or org.gnome.Terminal
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // Trash
        icon: "user-trash-full.svg", // user-trash
        canOpen: false,
    },
    {
        id: "BugSquasher",
        name: "Bug Squasher", // Activities/Overview
        icon: "input-gaming.svg", // view-grid-symbolic or preferences-system
        canOpen: true,
    },
];

interface BlogPost {
    id: number;
    date: string;
    title: string;
    image: string;
    link: string;
}

const blogPosts: BlogPost[] = [
    // {
    //     id: 1,
    //     date: "Sep 2, 2025",
    //     title:
    //         "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    //     image: "/images/blog1.png",
    //     link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    // },
    // {
    //     id: 2,
    //     date: "Aug 28, 2025",
    //     title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    //     image: "/images/blog2.png",
    //     link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    // },
    // {
    //     id: 3,
    //     date: "Aug 15, 2025",
    //     title: "The Ultimate Guide to Mastering GSAP Animations",
    //     image: "/images/blog3.png",
    //     link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    // },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "NestJS"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker", "VSCode", "Cursor", "Claude Code"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/afrizalsr18",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://zaldev.com/",
    },
    {
        id: 3,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/afrizal-syafri",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/library-photos.svg", // folder-pictures or media-optical
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/emblem-photos.svg", // emblem-photos or folder-visiting
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/mark-location.svg", // mark-location or find-location
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/system-users.svg", // system-users or avatar-default
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/emblem-favorite.svg", // emblem-favorite or starred
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/folder-documents.svg", // folder-documents or briefcase
    kind: "folder",
    children: [
        // ▶ Project 1
        // {
        //     id: 5,
        //     name: "Nike Ecommerce Website Application",
        //     icon: "/icons/folder.svg", // folder or inode-directory
        //     kind: "folder",
        //     position: "top-10 left-5", // icon position inside Finder
        //     windowPosition: "top-[5vh] left-5", // optional: Finder window position
        //     children: [
        //         {
        //             id: 1,
        //             name: "Nike Project.txt",
        //             icon: "/icons/text-x-generic.svg", // text-x-generic
        //             kind: "file",
        //             fileType: "txt",
        //             position: "top-5 left-10",
        //             description: [
        //                 "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
        //                 "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
        //                 "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
        //                 "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
        //             ],
        //         },
        //         {
        //             id: 2,
        //             name: "nike.com",
        //             icon: "/icons/text-html.svg", // text-html or web-browser
        //             kind: "file",
        //             fileType: "url",
        //             href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
        //             position: "top-10 right-20",
        //         },
        //         {
        //             id: 4,
        //             name: "nike.png",
        //             icon: "/icons/image-x-generic.svg", // image-x-generic
        //             kind: "file",
        //             fileType: "img",
        //             position: "top-52 right-80",
        //             imageUrl: "/images/project-1.png",
        //         },
        //         {
        //             id: 5,
        //             name: "Design.fig",
        //             icon: "/icons/x-office-document.svg", // x-office-document
        //             kind: "file",
        //             fileType: "fig",
        //             href: "https://google.com",
        //             position: "top-60 right-20",
        //         },
        //     ],
        // },

        // // ▶ Project 2
        // {
        //     id: 6,
        //     name: "AI Resume Analyzer",
        //     icon: "/icons/folder.svg",
        //     kind: "folder",
        //     position: "top-52 right-80",
        //     windowPosition: "top-[20vh] left-7",
        //     children: [
        //         {
        //             id: 1,
        //             name: "AI Resume Analyzer Project.txt",
        //             icon: "/icons/text-x-generic.svg",
        //             kind: "file",
        //             fileType: "txt",
        //             position: "top-5 right-10",
        //             description: [
        //                 "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
        //                 "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
        //                 "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
        //                 "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
        //             ],
        //         },
        //         {
        //             id: 2,
        //             name: "ai-resume-analyzer.com",
        //             icon: "/icons/text-html.svg",
        //             kind: "file",
        //             fileType: "url",
        //             href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
        //             position: "top-20 left-20",
        //         },
        //         {
        //             id: 4,
        //             name: "ai-resume-analyzer.png",
        //             icon: "/icons/image-x-generic.svg",
        //             kind: "file",
        //             fileType: "img",
        //             position: "top-52 left-80",
        //             imageUrl: "/images/project-2.png",
        //         },
        //         {
        //             id: 5,
        //             name: "Design.fig",
        //             icon: "/icons/x-office-document.svg", // x-office-document
        //             kind: "file",
        //             fileType: "fig",
        //             href: "https://google.com",
        //             position: "top-60 left-5",
        //         },
        //     ],
        // },

        // // ▶ Project 3
        // {
        //     id: 7,
        //     name: "Food Delivery App",
        //     icon: "/icons/folder.svg",
        //     kind: "folder",
        //     position: "top-10 left-80",
        //     windowPosition: "top-[33vh] left-7",
        //     children: [
        //         {
        //             id: 1,
        //             name: "Food Delivery App Project.txt",
        //             icon: "/icons/text-x-generic.svg",
        //             kind: "file",
        //             fileType: "txt",
        //             position: "top-5 left-10",
        //             description: [
        //                 "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
        //                 "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
        //                 "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
        //                 "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
        //             ],
        //         },
        //         {
        //             id: 2,
        //             name: "food-delivery-app.com",
        //             icon: "/icons/text-html.svg",
        //             kind: "file",
        //             fileType: "url",
        //             href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
        //             position: "top-10 right-20",
        //         },
        //         {
        //             id: 4,
        //             name: "food-delivery-app.png",
        //             icon: "/icons/image-x-generic.svg",
        //             kind: "file",
        //             fileType: "img",
        //             position: "top-52 right-80",
        //             imageUrl: "/images/project-3.png",
        //         },
        //         {
        //             id: 5,
        //             name: "Design.fig",
        //             icon: "/icons/x-office-document.svg", // x-office-document
        //             kind: "file",
        //             fileType: "fig",
        //             href: "https://google.com",
        //             position: "top-60 right-20",
        //         },
        //     ],
        // },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/dialog-information.svg", // dialog-information or help-about
    kind: "folder",
    children: [
        // {
        //     id: 1,
        //     name: "me.png",
        //     icon: "/icons/image-x-generic.svg",
        //     kind: "file",
        //     fileType: "img",
        //     position: "top-10 left-5",
        //     imageUrl: "/images/adrian.jpg",
        // },
        // {
        //     id: 2,
        //     name: "casual-me.png",
        //     icon: "/icons/image-x-generic.svg",
        //     kind: "file",
        //     fileType: "img",
        //     position: "top-28 right-72",
        //     imageUrl: "/images/adrian-2.jpg",
        // },
        // {
        //     id: 3,
        //     name: "conference-me.png",
        //     icon: "/icons/image-x-generic.svg",
        //     kind: "file",
        //     fileType: "img",
        //     position: "top-52 left-80",
        //     imageUrl: "/images/adrian-3.jpeg",
        // },
        // {
        //     id: 4,
        //     name: "about-me.txt",
        //     icon: "/images/txt.png",
        //     kind: "file",
        //     fileType: "txt",
        //     position: "top-60 left-5",
        //     subtitle: "Meet the Developer Behind the Code",
        //     image: "/images/adrian.jpg",
        //     description: [
        //         "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        //         "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        //         "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        //         "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
        //     ],
        // },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/x-office-document.svg", // x-office-document or text-x-generic
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/icons/application-pdf.svg", // application-pdf or x-office-document
            kind: "file",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/user-trash-full.svg", // user-trash or user-trash-full
    kind: "folder",
    children: [
        // {
        //     id: 1,
        //     name: "trash1.png",
        //     icon: "/icons/image-x-generic.svg",
        //     kind: "file",
        //     fileType: "img",
        //     position: "top-10 left-10",
        //     imageUrl: "/images/trash-1.png",
        // },
        // {
        //     id: 2,
        //     name: "trash2.png",
        //     icon: "/icons/image-x-generic.svg",
        //     kind: "file",
        //     fileType: "img",
        //     position: "top-40 left-80",
        //     imageUrl: "/images/trash-2.png",
        // },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: true, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    BugSquasher: { isOpen: true, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };