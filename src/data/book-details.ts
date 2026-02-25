import { resolveAsset } from "./assets";

export type BookDetail = {
  slug: string;
  pagePath: string;
  title: string;
  badge: string;
  meta: string;
  subtitle: string;
  description: string[];
  isbn: string;
  quote: string;
  coverImage: string;
  coverAspect: number;
  coverWidth: number;
  coverHeight: number;
};

export const bookDetails: BookDetail[] = [
  {
    slug: "aesthetic-intelligence",
    pagePath: "/rebuild/books/aesthetic-intelligence/",
    title: "Aesthetic Intelligence",
    badge: "Inspiration",
    meta: "Pauline Brown, 2019",
    subtitle: "Making connections & bridging gaps",
    description: [
        "Pauline Brown’s Aesthetic Intelligence explores an idea often overlooked in business: that beauty, taste, and emotional resonance can be sources of real competitive advantage. Drawing from her experience leading brands like LVMH, Brown argues that cultivating an aesthetic sensibility is as critical as mastering finance or marketing.",
        "The book reframes aesthetics not as decoration, but as decision-making — the ability to perceive, feel, and shape experiences that move people. Through stories and practical insights, Brown bridges two worlds that rarely meet: the analytical and the intuitive.",
        "It’s a reminder that design thinking doesn’t stop at objects or visuals. In every business, the way something feels is just as important as how it functions."
      ],
    isbn: "ISBN-10: 0062883305",
    quote: "I knew that over the long term, the aesthetic and creative assets of the business would lead to financial success.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book16_416de909de.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "graphic-design-manual",
    pagePath: "/rebuild/books/graphic-design-manual/",
    title: "Graphic Design Manual",
    badge: "Practice",
    meta: "Armin Hofmann, 1965",
    subtitle: "Design as balance — precision guided by intuition.",
    description: [
        "Armin Hofmann’s Graphic Design Manual is one of the purest distillations of Swiss design principles — a synthesis of form, function, and visual harmony. Rather than prescribing rules, Hofmann teaches sensitivity: how contrast, rhythm, and proportion can create meaning.",
        "Every page feels like a quiet dialogue between logic and emotion. The exercises are simple yet profound — revealing how minimal shifts in weight or scale can change perception entirely. Hofmann’s approach is less about style and more about awareness — a way of seeing and composing that extends beyond the page.",
        "This book endures because it doesn’t age; it reminds us that timeless design is not a trend, but a discipline of constant refinement."
      ],
    isbn: "ISBN-10: 0442234694",
    quote: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book09_f16663f3da.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "grid-systems-br-in-graphic-design",
    pagePath: "/rebuild/books/grid-systems-br-in-graphic-design/",
    title: "Grid Systems\nin Graphic Design",
    badge: "Practice",
    meta: "Josef Müller-Brockmann, 1981",
    subtitle: "The architecture behind visual order.",
    description: [
        "Grid Systems in Graphic Design is a philosophy of order.",
        "Josef Müller-Brockmann presents the grid not as a cage but as a framework for clarity, consistency, and meaning. His belief in rational structure shaped generations of designers who learned that creativity grows stronger within constraints.",
        "The book is unapologetically strict. Yet, through its rigor, it reveals something poetic: when every element finds its place, communication becomes transparent and design gains rhythm.",
        "It’s a book that teaches not how to decorate but how to think — with precision, intention, and purpose."
      ],
    isbn: "ISBN-10: 9783721201451",
    quote: "The grid system is an aid, not a guarantee.\n\nIt permits a number of possible uses and each designer can look for a solution appropriate to his personal style.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book13_3c48cb1037.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "grid-systems-principles-br-of-organizing-type",
    pagePath: "/rebuild/books/grid-systems-principles-br-of-organizing-type/",
    title: "Grid Systems: Principles\nof Organizing Type",
    badge: "Practice",
    meta: "Kimberly Elam, 2004",
    subtitle: "Structure reveals,\nit doesn’t restrict.",
    description: [
        "Kimberly Elam’s Grid Systems revisits the modernist obsession with order and gives it new clarity for contemporary designers.",
        "It’s not a repetition of Müller-Brockmann’s logic, but a more analytical, almost architectural exploration of how grids shape rhythm, proportion, and hierarchy in visual communication.",
        "Elam turns what could be a rigid theory into something practical and elegant. Each diagram, each spread, builds a visual argument for why structure is not the enemy of creativity but its foundation. Her approach feels less dogmatic, more educational — helping designers understand not just how to organize type, but why.",
        "It’s a book for those who want to design with reason and rhythm, and for anyone who believes precision can coexist with emotion."
      ],
    isbn: "ISBN-10: 1568984650",
    quote: "The grid is a framework that brings order to chaos and allows the designer to concentrate on expression within structure.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book08_27a91e07ac.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "how-to",
    pagePath: "/rebuild/books/how-to/",
    title: "How To…",
    badge: "Works",
    meta: "Michael Bierut, 2015",
    subtitle: "Lessons from a designer’s life.",
    description: [
        "Michael Bierut’s How To… is a masterclass in honesty and perspective.",
        "It’s less a how-to manual and more a designer’s autobiography told through the lens of process — how to think, present, persuade, and, most importantly, listen.",
        "Bierut’s stories unfold with warmth and precision, revealing how design lives not in theory but in dialogue.",
        "What makes the book resonate is its humanity. It celebrates imperfection, humor, and the messy collaboration behind good work. Bierut doesn’t romanticize design — he demystifies it, showing that insight often comes from empathy rather than genius.",
        "How To… feels like sitting in a studio with a mentor — one who’s been through every pitch, every failure, every small victory, and still believes design is about connecting ideas to people."
      ],
    isbn: "ISBN-10: 0063141574",
    quote: "If you can’t explain your ideas to your mother-in-law in sixty seconds, maybe you don’t really understand them yourself.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book01_b6a86fd623.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "in-the-eye-of-the-storm-br-modernism-in-ukraine",
    pagePath: "/rebuild/books/in-the-eye-of-the-storm-br-modernism-in-ukraine/",
    title: "In the Eye of the Storm:\nModernism in Ukraine",
    badge: "History",
    meta: "Konstantin Akinsha, Katia Denysova,\nOlena Kashuba-Volvach, 2022",
    subtitle: "Modernism on the edge — creation against collapse.",
    description: [
        "In the Eye of the Storm reveals a chapter that history almost erased — the Ukrainian avant-garde of the early 20th century.\nIt’s a story of radical experiments born in turbulence: artists reimagining form, typography, and identity amid revolution and repression.",
        "The book restores names and works long overshadowed by imperial narratives, showing that Ukraine was not a secondary player in modernism but one of its engines.\nEvery page vibrates with contrast — bold geometry beside political fragility, hope beside censorship. It’s both an art history and an act of cultural reclamation.",
        "Beyond its visual richness, the book feels urgent. It reminds us that creativity can flourish even in chaos, and that design, at its core, is resistance through vision."
      ],
    isbn: "ISBN-10: 0500297150",
    quote: "Modernism in Ukraine was born not in silence, but in the storm — a dialogue between freedom and survival.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book03_da194d91b1.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "interaction-of-color",
    pagePath: "/rebuild/books/interaction-of-color/",
    title: "Interaction of Color",
    badge: "Practice",
    meta: "Josef Albers, 1963",
    subtitle: "Seeing is not passive; it’s an act of design.",
    description: [
        "First published in 1963, Interaction of Color remains one of the most timeless explorations of visual perception.",
        "Josef Albers turns color from a static property into a living, relational system. Through deceptively simple exercises, he shows how color deceives, transforms, and depends entirely on its context — and on the viewer.",
        "This is not a book to be read once. It’s a manual for learning to see — to train the eye to question what feels obvious. Every page invites you to slow down, to experiment, to realize that color has no fixed truth."
      ],
    isbn: "ISBN-10: 0300179359",
    quote: "In visual perception a color is almost never seen as it really is — as it physically is.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book07_6a621550f2.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "the-art-of-color",
    pagePath: "/rebuild/books/the-art-of-color/",
    title: "The Art of Color",
    badge: "Practice",
    meta: "Johannes Itten, 1961",
    subtitle: "Color is emotion made visible.",
    description: [
        "Johannes Itten’s The Art of Color is both science and poetry — a bridge between the measurable and the deeply felt.",
        "His work connects perception, psychology, and composition into a complete system of visual harmony.",
        "Each chapter is a study in duality, warm and cool, light and dark, contrast and balance. But beyond theory, the book is a meditation on awareness. Itten teaches the designer to see color as energy, to feel its temperature and rhythm, and to understand how it alters the meaning of form.",
        "More than a manual, The Art of Color is a lifelong companion for anyone who believes design is not only constructed but also felt."
      ],
    isbn: "ISBN-10: 0442234694",
    quote: "Color is life; for a world without color appears to us as dead. As a flame produces light, light produces color.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book12_4e99171c95.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "the-debate",
    pagePath: "/rebuild/books/the-debate/",
    title: "The Debate",
    badge: "History",
    meta: "Wim Crouwel, Jan Van Torn, 2015",
    subtitle: "Design as ideology, not just aesthetics.",
    description: [
        "The Debate captures one of the most important conversations in design history.\nIt is a clash between order and expression, neutrality and engagement.",
        "Wim Crouwel stood for the grid, structure, and clarity; Jan van Toorn for subjectivity, politics, and social responsibility. Their dialogue exposes design not as a stylistic practice but as an ideological one.",
        "Reading it today feels surprisingly current. The questions they raised — about ethics, authorship, and the designer’s role in shaping society — echo in every project we create. It’s not about who was right, but about how both perspectives sharpen our understanding of what design can and should do.",
        "The Debate is short but potent — a reminder that every layout, every type choice, every silence in design carries a point of view."
      ],
    isbn: "ISBN-10: 9781580934121",
    quote: "Designers should not be neutral.\nThey should be conscious, critical, and committed.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book10_6b8600f1d6.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "the-geometry-of-type",
    pagePath: "/rebuild/books/the-geometry-of-type/",
    title: "The Geometry of Type",
    badge: "Practice",
    meta: "Stephen Coles, 2013",
    subtitle: "Rational typefaces are drawn, not written, but their origins still come from the pen.",
    description: [
        "Stephen Coles’ The Geometry of Type is a study in detail — a dissection of how letters work, why they differ, and what makes them timeless. Across one hundred typefaces, Coles and designer Erik Spiekermann map the anatomy of typography with surgical precision and aesthetic sensitivity.",
        "What makes it special is its clarity. Each spread balances analysis with appreciation, showing that type is not just drawn but engineered — a product of countless micro-decisions that shape how language feels.",
        "Coles writes with the calm authority of someone who truly knows letters."
      ],
    isbn: "ISBN-10: 0500241422",
    quote: "Typography is geometry with character — precision shaped\nto speak.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book04_93c6f6a570.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "the-new-typography",
    pagePath: "/rebuild/books/the-new-typography/",
    title: "The New Typography",
    badge: "Practice",
    meta: "Jan Tschichold, 1928",
    subtitle: "Communication before ornament.",
    description: [
        "Published in 1928, The New Typography marked a turning point in design history.",
        "Jan Tschichold captured the radical spirit of the modernist era — rejecting decoration, symmetry, and tradition in favor of function, hierarchy, and precision. His manifesto didn’t just redefine how type should look, but what design should mean.",
        "What makes the book timeless is not its style but its conviction. Tschichold’s writing burns with urgency — the belief that design must serve society through clarity and efficiency. Even though he later softened his stance, his early vision still echoes through every sans-serif logo, asymmetric layout, and minimalist interface we see today.",
        "The New Typography is a reminder that innovation starts with taking a side, and daring to question the rules that came before you."
      ],
    isbn: "ISBN-10: 0520250125",
    quote: "The aim of every typographic work is the delivery of a message in the shortest, most efficient manner.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book05_ee87171ea0.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "the-vignelli-canon",
    pagePath: "/rebuild/books/the-vignelli-canon/",
    title: "The Vignelli Canon",
    badge: "Practice",
    meta: "Massimo Vignelli, 2010",
    subtitle: "Guidelines from one of the greats.",
    description: [
        "The Vignelli Canon is more than a guide; it’s a manifesto of Massimo's style.\n\nMassimo Vignelli distilled decades of design practice into a concise statement about integrity, structure, and the pursuit of timeless form. Every page radiates clarity as a moral stance.",
        "Vignelli believed that design must be both intellectually rigorous and emotionally refined. He rejected style for the sake of style, insisting instead on purpose, proportion, and order. In his words and examples, you can feel the serenity of a designer who found freedom in limitation.",
        "Reading it today feels like a conversation with a mentor — calm, confident, and unwavering in belief that good design isn't subjective, but simply right."
      ],
    isbn: "ISBN-10: 3037782250",
    quote: "A designer without principles is like an architect without gravity — form collapses into decoration.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book14_57e4ad3fbe.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "type-a-visual-history-br-of-typefaces-and-graphic-styles",
    pagePath: "/rebuild/books/type-a-visual-history-br-of-typefaces-and-graphic-styles/",
    title: "Type: A Visual History\nof Typefaces and Graphic Styles",
    badge: "History",
    meta: "Alston W. Purvis, Cees W. de Jong,\nJan Tholenaar, 2009",
    subtitle: "A journey through type’s evolution.",
    description: [
        "Type: A Visual History of Typefaces and Graphic Styles is not a book you simply read — it’s one you explore.",
        "Drawn from Jan Tholenaar’s legendary collection, it traces the evolution of letterforms across five centuries of design. Every page is an artifact, revealing how culture, technology, and craftsmanship have shaped the way we communicate.",
        "The book feels like walking through a typographic time capsule. From engraved alphabets to early sans-serifs, from ornate Victorian scripts to geometric modernism, it celebrates the tension between art and utility. Purvis and his co-authors don’t just catalogue typefaces — they show how each carries the fingerprint of its era."
      ],
    isbn: "ISBN-10: 3836565889",
    quote: "Type is the finger post pointing to the difference between the progressive and ambitious printer and the one who just plods along.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book06_04ca0dca19.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "typography-br-a-manual-of-design",
    pagePath: "/rebuild/books/typography-br-a-manual-of-design/",
    title: "Typography:\nA Manual of Design",
    badge: "Practice",
    meta: "Emil Ruder, 1967",
    subtitle: "Type speaks,\nnot decorates.",
    description: [
        "Emil Ruder’s Typography stands as one of the clearest, most rigorous meditations on the craft of visual communication. Rooted in the Swiss tradition, the book rejects ornament in favor of logic, balance, and the beauty of reduction.",
        "For Ruder, typography is not about prettiness — it’s about clarity and rhythm, about giving words structure that amplifies meaning.",
        "What makes this book enduring is its quiet intensity. Ruder writes with the precision of an engineer and the sensitivity of a composer, treating space, weight, and proportion as instruments of language. Every spread is a lesson in restraint — in how to let typography serve thought without ever overshadowing it.",
        "It’s less a manual than a philosophy of seeing: disciplined, deliberate, and profoundly humane."
      ],
    isbn: "ISBN-10: 3721200438",
    quote: "Typography is the craft of endowing human language with a durable\nvisual form.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book15_45e051c563.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "work-for-money-br-design-for-love",
    pagePath: "/rebuild/books/work-for-money-br-design-for-love/",
    title: "Work for Money,\nDesign for Love",
    badge: "Inspiration",
    meta: "David Airey, 2012",
    subtitle: "Passion builds value — not just profit.",
    description: [
        "David Airey’s Work for Money, Design for Love is a rare mix of honesty and practicality — a book about what it really means to make a living from creativity.",
        "It speaks to designers not as dreamers or businesspeople, but as both. Airey shares lessons learned from the messy middle ground between doing what you love and sustaining it as a profession.",
        "The tone is human, transparent, and deeply grounded in experience. Airey reminds us that design is a relationship: between creator and client, vision and value, art and responsibility.",
        "Reading it feels like talking with a mentor, one who has already made the mistakes you’re trying to avoid, and still believes in love as the ultimate motivator."
      ],
    isbn: "ISBN-10: 0321844270",
    quote: "Do good work for good people.\nThe rest takes care of itself.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book11_d92b4522cd.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
  {
    slug: "year-of-yes",
    pagePath: "/rebuild/books/year-of-yes/",
    title: "Year of Yes",
    badge: "Inspiration",
    meta: "Shonda Rhimes, 2015",
    subtitle: "Courage begins where comfort ends.",
    description: [
        "Shonda Rhimes’ Year of Yes is a book about reclaiming life through boldness, a personal experiment that turned into a philosophy.",
        "Known for shaping some of television’s most powerful stories, Rhimes turns her lens inward, asking what happens when we stop saying no to possibility.",
        "The book is raw, funny, and deeply human. It’s about fear, vulnerability, and the quiet discipline of showing up for yourself. Beneath its humor lies something profoundly relevant to creative work: the idea that growth demands discomfort, and that confidence is a result."
      ],
    isbn: "ISBN-10: 1476777128",
    quote: "Every \"yes\" changes something in you. It doesn’t make life easier; it makes it wider.",
    coverImage: resolveAsset("https://ttf-7ecj.onrender.com/uploads/Image_Book02_c128877198.jpg"),
    coverAspect: 1.6583333333333334,
    coverWidth: 796,
    coverHeight: 480,
  },
];

const bookDetailMap: Record<string, BookDetail> = Object.fromEntries(
  bookDetails.map((book) => [book.slug, book]),
);

export function getBookDetail(slug: string): BookDetail | undefined {
  return bookDetailMap[slug];
}
