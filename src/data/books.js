/*
Book Score (0–10) — Personal Utility Rubric

1) Readability & Flow (highest weight)
   - How long I could read in one sitting
   - Clarity, pacing, mental friction

2) Retention & Stickiness
   - Ideas remembered weeks/months later
   - Lasting mental models or behavior changes

3) Correctness & Rigor
   - Factual accuracy and logical coherence
   - Clear separation of evidence vs opinion

4) Repetition Penalty
   - Noticeably repetitive: −2 points
   - Severely padded: −3 points

Final score is a holistic judgment (not an average).
Emphasizes personal ROI over public consensus.
*/

export default {
    Current: [
        {
            title: "The Meditations of Marcus Aurelius", 
            topic: "Philosophy",
            score: 6
        },
    ],
    Wishlist: [
        {
            title: "The Pragmatic Programmer",
            topic: "Software Engineering",
            score: 0
        },
        { 
            title: "Financial Theory with Python", 
            topic: "Finance", 
            score: 0 
        },
        // Quant Foundations
        {
            title: "Statistics for Engineers and Scientists", 
            topic: "Data & ML",
            score: 0
        },
        {
            title: "Time Series Analysis and Its Applications", 
            topic: "Data & ML",
            score: 0
        },
        {
            title: "Quantitative Trading", 
            topic: "Finance",
            score: 0
        },
        // Systematic Trading & Research Process
        {
            title: "Algorithmic Trading", 
            topic: "Finance",
            score: 0
        },
        {
            title: "Advances in Financial Machine Learning", 
            topic: "Data & ML",
            score: 0
        },
        {
            title: "Machine Learning for Asset Managers", 
            topic: "Data & ML",
            score: 0
        },
        // Portfolio Construction & Risk
        {
            title: "Expected Returns", 
            topic: "Finance",
            score: 0
        },
        {
            title: "Active Portfolio Management", 
            topic: "Finance",
            score: 0
        },
        // Derivatives & Pricing
        {
            title: "Options, Futures, and Other Derivatives", 
            topic: "Finance",
            score: 0
        },
        {
            title: "Stochastic Calculus for Finance I", 
            topic: "Finance",
            score: 0
        },
        // Crypto Market Microstructure
        {
            title: "Algorithmic and High-Frequency Trading", 
            topic: "Finance",
            score: 0
        },
        {
            title: "BitMEX / Deribit Research Papers", 
            topic: "Finance",
            score: 0
        },
        {
            title: "Kaiko Research Reports", 
            topic: "Finance",
            score: 0
        },
        {
            title: "CME & CBOE Microstructure Whitepapers", 
            topic: "Finance",
            score: 0
        },
        // Optional High-Value Reads
        {
            title: "The Econometrics of Financial Markets", 
            topic: "Data & ML",
            score: 0
        },
        {
            title: "Machine Learning in Finance", 
            topic: "Data & ML",
            score: 0
        },
        {
            title: "Trading and Exchanges", 
            topic: "Finance",
            score: 0 
        },
        // Systems Thinking + Engineering Thought Process
        {
            title: "Thinking in Systems",
            topic: "Systems Thinking",
            score: 0
        },
        {
            title: "Engineering and the Mind's Eye",
            topic: "Systems Thinking",
            score: 0
        },
        {
            title: "Thinking: A Guide to Systems Engineering Problem-Solving",
            topic: "Systems Thinking",
            score: 0
        },
        {
            title: "The MITRE Systems Engineering Guide",
            topic: "Systems Thinking",
            score: 0
        },

        // Build Systems / Toolchains / Compilers
        {
            title: "Software Build Systems: Principles and Experience",
            topic: "Computer Science",
            score: 0
        },
        {
            title: "Linkers and Loaders",
            topic: "Computer Science",
            score: 0
        },
        {
            title: "Engineering a Compiler",
            topic: "Computer Science",
            score: 0
        },
        // Modern Build / DevProd Philosophy
        {
            title: "Continuous Delivery",
            topic: "Software Engineering",
            score: 0
        },
        {
            title: "Software Engineering at Google",
            topic: "Software Engineering",
            score: 0
        }
    ],
    Suggestions: [
        {
            title: "The Phoenix Project", 
            topic: "Software Engineering",
            score: 9
        },
        {
            title: "Radicals & Visionaries: Entrepreneurs Who Revolutionized the 20th Century", 
            topic: "Business",
            score: 8
        },
        {
            title: "Why Nations Fail: The Origins of Power, Prosperity, and Poverty", 
            topic: "Economics",
            score: 7 
        }
    ],
    Archive: [
        {
            title: "The Magician’s Nephew (Chronicles of Narnia, #6)", 
            topic: "Fiction",
            score: 10
        },
        {
            title: "The Silver Chair (Chronicles of Narnia, #4)", 
            topic: "Fiction",
            score: 10
        },
        {
            title: "Tuesdays with Morrie", 
            topic: "Biography & History",
            score: 8
        },
        {
            title: "The Name of the Rose", 
            topic: "Fiction",
            score: 10
        },
        {
            title: "The Voyage of the Dawn Treader (Chronicles of Narnia, #3)", 
            topic: "Fiction",
            score: 10
        },
        {
            title: "The 22 Immutable Laws of Marketing: Violate Them at Your Own Risk", 
            topic: "Business",
            score: 9
        },
        {
            title: "Chūshingura (The Treasury of Loyal Retainers): A Puppet Play", 
            topic: "Biography & History",
            score: 8
        },
        {
            title: "The Outsiders", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "My Name Is Red", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Animal Farm", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "The Hunger Games (The Hunger Games, #1)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Harry Potter and the Order of the Phoenix (Harry Potter, #5)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Uglies (Uglies, #1)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Harry Potter and the Goblet of Fire (Harry Potter, #4)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Unbroken: A World War II Story of Survival, Resilience and Redemption", 
            topic: "Biography & History",
            score: 8
        },
        {
            title: "Harry Potter and the Half-Blood Prince (Harry Potter, #6)", 
            topic: "Fiction",
            score: 8
        },
        {
            title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", 
            topic: "Biography & History",
            score: 8
        },
        {
            title: "Living with a SEAL: 31 Days Training with the Toughest Man on the Planet", 
            topic: "Self-Development",
            score: 7
        },
        {
            title: "The Lean Startup: How Today’s Entrepreneurs Use Continuous Improvement to Create Radically Successful Businesses", 
            topic: "Business",
            score: 8
        },
        {
            title: "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life", 
            topic: "Self-Development",
            score: 6
        },
        {
            title: "The Great Gatsby", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Sailor Who Fell from Grace with the Sea", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Last Battle (Chronicles of Narnia, #7)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Handmaid's Tale", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "Naked Economics: Undressing the Dismal Science", 
            topic: "Economics",
            score: 6
        },
        {
            title: "Harry Potter and the Deathly Hallows (Harry Potter, #7)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Horse and His Boy (Chronicles of Narnia, #5)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "Prince Caspian (Chronicles of Narnia, #2)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Lion, the Witch and the Wardrobe (Chronicles of Narnia, #1)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "Catching Fire (The Hunger Games, #2)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "Harry Potter and the Chamber of Secrets (Harry Potter, #2)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "Mockingjay (The Hunger Games, #3)", 
            topic: "Fiction",
            score: 6
        },
        {
            title: "The Complete Persepolis", 
            topic: "Biography & History",
            score: 6
        },
        {
            title: "How to Be a Real Estate Investor", 
            topic: "Business",
            score: 6
        },
        {
            title: "Dream Big: Know What You Want, Why You Want It, and What You’re Going to Do About", 
            topic: "Self-Development",
            score: 6
        },
        {
            title: "The Real Estate Wholesaling Bible", 
            topic: "Business",
            score: 6
        },
        {
            title: "Romeo and Juliet", 
            topic: "Fiction",
            score: 5
        },
        {
            title: "The Prince", 
            topic: "Philosophy",
            score: 5
        },
        {
            title: "The Unicorn Project", 
            topic: "Software Engineering",
            score: 5
        },
        {
            title: "Othello", 
            topic: "Fiction",
            score: 4
        },
        {
            title: "Fahrenheit 451", 
            topic: "Fiction",
            score: 4
        },
        {
            title: "Think and Grow Rich", 
            topic: "Self-Development",
            score: 4
        },
        {
            title: "Rich Dad, Poor Dad", 
            topic: "Self-Development",
            score: 6
        },
        {
            title: "Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)", 
            topic: "Fiction",
            score: 4
        },
        {
            title: "No Country for Old Men", 
            topic: "Fiction",
            score: 4
        },
        {
            title: "To Kill a Mockingbird", 
            topic: "Fiction",
            score: 4
        },
        {
            title: "How to Win Friends & Influence People", 
            topic: "Self-Development",
            score: 3
        },
        {
            title: "The One Thing", 
            topic: "Self-Development",
            score: 3
        },
        {
            title: "Talking to Strangers", 
            topic: "Self-Development",
            score: 3
        },
        {
            title: "Twilight (The Twilight Saga, #1)", 
            topic: "Fiction",
            score: 2
        },
        {
            title: "Del sentimiento trágico de la vida", 
            topic: "Philosophy",
            score: 2
        },
        {
            title: "The Catcher in the Rye", 
            topic: "Fiction",
            score: 3
        }
    ]
};
