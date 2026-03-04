import { BookOpen, Calculator, Atom, FlaskConical, Leaf, TrendingUp, Monitor } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  modelUrl?: string;
  quizzes: Quiz[];
}

export interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  lessons: Lesson[];
}

export const subjects: Subject[] = [
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color: "subject-english",
    description: "Literature, grammar, and creative writing for Class 12",
    lessons: [
      {
        id: "eng-1",
        title: "The Last Lesson",
        content: "The Last Lesson by Alphonse Daudet is set during the Franco-Prussian War. The story is narrated by a young French boy, Franz, who dislikes studying French. On arriving late to school, he discovers that it is their last French lesson, as the district has been ordered to teach only German. The teacher, M. Hamel, gives an emotional final class about the importance of holding onto one's language and culture.\n\nKey themes include patriotism, the value of education, and the importance of language as a cultural identity. The story movingly portrays how people often fail to appreciate what they have until it is taken away.",
        quizzes: [
          {
            id: "eng-1-q1",
            title: "Quiz 1: Comprehension",
            questions: [
              { id: "q1", question: "Who is the narrator of 'The Last Lesson'?", options: ["M. Hamel", "Franz", "The Mayor", "Alphonse Daudet"], correctAnswer: 1 },
              { id: "q2", question: "What war is the backdrop of the story?", options: ["World War I", "Franco-Prussian War", "World War II", "Napoleonic Wars"], correctAnswer: 1 },
              { id: "q3", question: "What language was ordered to replace French?", options: ["English", "Spanish", "German", "Italian"], correctAnswer: 2 },
              { id: "q4", question: "What is the main theme of the lesson?", options: ["Adventure", "Patriotism & Language", "Science", "Comedy"], correctAnswer: 1 },
              { id: "q5", question: "How did M. Hamel feel during the last lesson?", options: ["Happy", "Indifferent", "Emotional and sad", "Angry"], correctAnswer: 2 },
            ],
          },
          {
            id: "eng-1-q2",
            title: "Quiz 2: Analysis",
            questions: [
              { id: "q6", question: "What does M. Hamel write on the board at the end?", options: ["Goodbye", "Vive La France", "Thank You", "Au Revoir"], correctAnswer: 1 },
              { id: "q7", question: "Franz's attitude toward school changed because...", options: ["He got a new teacher", "It was the last French lesson", "He made new friends", "The school was closing"], correctAnswer: 1 },
              { id: "q8", question: "The villagers attended the last lesson because...", options: ["It was a holiday", "To pay respect to their language", "They were curious", "The mayor ordered them"], correctAnswer: 1 },
              { id: "q9", question: "What literary device is most prominent in the story?", options: ["Hyperbole", "Irony", "Onomatopoeia", "Alliteration"], correctAnswer: 1 },
              { id: "q10", question: "The pigeon cooing on the roof symbolizes...", options: ["Freedom", "Mockery of German rule", "Sadness", "Nature"], correctAnswer: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "maths",
    name: "Mathematics",
    icon: Calculator,
    color: "subject-maths",
    description: "Calculus, algebra, and probability for Class 12",
    lessons: [
      {
        id: "math-1",
        title: "Relations and Functions",
        content: "A relation R from set A to set B is a subset of A × B. A function is a special type of relation where every element of set A has exactly one image in set B.\n\nTypes of functions:\n• One-one (Injective): Each element maps to a unique element\n• Onto (Surjective): Every element in codomain has a pre-image\n• Bijective: Both one-one and onto\n\nComposition of functions: (f ∘ g)(x) = f(g(x))\nInverse functions exist only for bijective functions.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        quizzes: [
          {
            id: "math-1-q1",
            title: "Quiz 1: Basics",
            questions: [
              { id: "q1", question: "A function f: A → B is one-one if...", options: ["f(a)=f(b) implies a=b", "Every element has an image", "Range = Codomain", "None of these"], correctAnswer: 0 },
              { id: "q2", question: "If f is bijective, then f⁻¹ is...", options: ["Not defined", "Also bijective", "Only injective", "Only surjective"], correctAnswer: 1 },
              { id: "q3", question: "The composition (f∘g)(x) means...", options: ["f(x)·g(x)", "f(g(x))", "g(f(x))", "f(x)+g(x)"], correctAnswer: 1 },
              { id: "q4", question: "A relation is reflexive if...", options: ["(a,b) ∈ R implies (b,a) ∈ R", "(a,a) ∈ R for all a", "(a,b),(b,c) implies (a,c)", "None"], correctAnswer: 1 },
              { id: "q5", question: "Number of bijective functions from {1,2,3} to itself?", options: ["3", "6", "9", "27"], correctAnswer: 1 },
            ],
          },
          {
            id: "math-1-q2",
            title: "Quiz 2: Advanced",
            questions: [
              { id: "q6", question: "An equivalence relation must be...", options: ["Reflexive only", "Symmetric only", "Reflexive, symmetric, transitive", "None"], correctAnswer: 2 },
              { id: "q7", question: "If f(x)=2x+3, then f⁻¹(x)=?", options: ["(x-3)/2", "2x-3", "(x+3)/2", "3x+2"], correctAnswer: 0 },
              { id: "q8", question: "The identity function is...", options: ["One-one only", "Onto only", "Bijective", "Neither"], correctAnswer: 2 },
              { id: "q9", question: "Range of f(x) = |x| is...", options: ["All reals", "[0, ∞)", "(-∞, 0]", "{0}"], correctAnswer: 1 },
              { id: "q10", question: "A constant function is...", options: ["One-one", "Onto", "Neither one-one nor onto", "Bijective"], correctAnswer: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    color: "subject-physics",
    description: "Electrostatics, optics, and modern physics for Class 12",
    lessons: [
      {
        id: "phy-1",
        title: "Electric Charges and Fields",
        content: "Electric charge is a fundamental property of matter. There are two types of charges: positive and negative. Like charges repel and unlike charges attract.\n\nCoulomb's Law: F = kq₁q₂/r²\nwhere k = 9 × 10⁹ Nm²/C²\n\nElectric Field (E) = F/q₀ (force per unit positive test charge)\n\nElectric field lines:\n• Start from positive charges, end at negative charges\n• Never cross each other\n• Denser lines indicate stronger field\n\nGauss's Law: The total electric flux through a closed surface equals q/ε₀",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        quizzes: [
          {
            id: "phy-1-q1",
            title: "Quiz 1: Fundamentals",
            questions: [
              { id: "q1", question: "The SI unit of electric charge is...", options: ["Volt", "Ampere", "Coulomb", "Ohm"], correctAnswer: 2 },
              { id: "q2", question: "Coulomb's law is analogous to...", options: ["Ohm's law", "Newton's law of gravitation", "Faraday's law", "Hooke's law"], correctAnswer: 1 },
              { id: "q3", question: "Electric field lines never...", options: ["Start from charges", "End at charges", "Cross each other", "Curve"], correctAnswer: 2 },
              { id: "q4", question: "The value of k in Coulomb's law is...", options: ["6.67 × 10⁻¹¹", "9 × 10⁹", "1.6 × 10⁻¹⁹", "3 × 10⁸"], correctAnswer: 1 },
              { id: "q5", question: "An electric dipole consists of...", options: ["One charge", "Two equal and opposite charges", "Three charges", "A neutral atom"], correctAnswer: 1 },
            ],
          },
          {
            id: "phy-1-q2",
            title: "Quiz 2: Applications",
            questions: [
              { id: "q6", question: "Gauss's law relates flux to...", options: ["Magnetic field", "Enclosed charge", "Current", "Voltage"], correctAnswer: 1 },
              { id: "q7", question: "Inside a conductor, the electric field is...", options: ["Maximum", "Minimum", "Zero", "Infinite"], correctAnswer: 2 },
              { id: "q8", question: "Electric flux has units of...", options: ["N/C", "Nm²/C", "V/m", "C/m²"], correctAnswer: 1 },
              { id: "q9", question: "Quantization of charge means charge is...", options: ["Continuous", "Always positive", "An integer multiple of e", "Zero"], correctAnswer: 2 },
              { id: "q10", question: "The electric field due to a point charge varies as...", options: ["1/r", "1/r²", "1/r³", "r²"], correctAnswer: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    color: "subject-chemistry",
    description: "Organic, inorganic, and physical chemistry for Class 12",
    lessons: [
      {
        id: "chem-1",
        title: "The Solid State",
        content: "Solids have definite shape and volume. They are classified as crystalline (regular arrangement) and amorphous (irregular arrangement).\n\nCrystal Lattices: 14 Bravais lattices exist in 3D. Unit cells can be:\n• Simple/Primitive: atoms at corners only\n• Body-centered (BCC): atom at center + corners\n• Face-centered (FCC): atoms at face centers + corners\n\nPacking efficiency:\n• Simple cubic: 52.4%\n• BCC: 68%\n• FCC/HCP: 74%\n\nDefects in crystals: Schottky defect (missing ions), Frenkel defect (displaced ions).",
        quizzes: [
          {
            id: "chem-1-q1",
            title: "Quiz 1: Crystal Structure",
            questions: [
              { id: "q1", question: "FCC unit cell has how many atoms?", options: ["1", "2", "4", "6"], correctAnswer: 2 },
              { id: "q2", question: "Amorphous solids are also called...", options: ["True solids", "Pseudo solids", "Ionic solids", "Metallic solids"], correctAnswer: 1 },
              { id: "q3", question: "Which has highest packing efficiency?", options: ["Simple cubic", "BCC", "FCC", "All same"], correctAnswer: 2 },
              { id: "q4", question: "Schottky defect decreases...", options: ["Hardness", "Density", "Color", "Conductivity"], correctAnswer: 1 },
              { id: "q5", question: "Number of Bravais lattices in 3D?", options: ["7", "14", "21", "28"], correctAnswer: 1 },
            ],
          },
          {
            id: "chem-1-q2",
            title: "Quiz 2: Properties",
            questions: [
              { id: "q6", question: "Glass is an example of...", options: ["Crystalline solid", "Amorphous solid", "Liquid crystal", "Gas"], correctAnswer: 1 },
              { id: "q7", question: "BCC unit cell has how many atoms?", options: ["1", "2", "4", "8"], correctAnswer: 1 },
              { id: "q8", question: "Frenkel defect is common in...", options: ["Ionic with similar sized ions", "Ionic with different sized ions", "Metallic solids", "Molecular solids"], correctAnswer: 1 },
              { id: "q9", question: "Coordination number in FCC is...", options: ["4", "6", "8", "12"], correctAnswer: 3 },
              { id: "q10", question: "Diamond is an example of...", options: ["Ionic solid", "Molecular solid", "Covalent solid", "Metallic solid"], correctAnswer: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    icon: Leaf,
    color: "subject-biology",
    description: "Genetics, ecology, and human biology for Class 12",
    lessons: [
      {
        id: "bio-1",
        title: "Reproduction in Organisms",
        content: "Reproduction is a biological process by which organisms produce offspring. It is of two types:\n\n1. Asexual Reproduction: Involves a single parent. Types include:\n• Binary fission (Amoeba)\n• Budding (Yeast, Hydra)\n• Spore formation (Fungi)\n• Vegetative propagation (Plants)\n• Fragmentation (Planaria)\n\n2. Sexual Reproduction: Involves fusion of male and female gametes.\n• Isogametes: Similar gametes (e.g., Cladophora)\n• Heterogametes: Different gametes (most organisms)\n\nPhases: Juvenile → Reproductive → Senescent\nPlants can be monoecious (both sexes) or dioecious (separate sexes).",
        quizzes: [
          {
            id: "bio-1-q1",
            title: "Quiz 1: Asexual Reproduction",
            questions: [
              { id: "q1", question: "Binary fission is seen in...", options: ["Hydra", "Amoeba", "Yeast", "Planaria"], correctAnswer: 1 },
              { id: "q2", question: "Budding occurs in...", options: ["Amoeba", "Planaria", "Yeast", "Spirogyra"], correctAnswer: 2 },
              { id: "q3", question: "Vegetative propagation is a type of...", options: ["Sexual reproduction", "Asexual reproduction", "Both", "Neither"], correctAnswer: 1 },
              { id: "q4", question: "Fragmentation is seen in...", options: ["Amoeba", "Hydra", "Planaria", "Yeast"], correctAnswer: 2 },
              { id: "q5", question: "Spore formation occurs in...", options: ["Animals", "Fungi", "Humans", "Birds"], correctAnswer: 1 },
            ],
          },
          {
            id: "bio-1-q2",
            title: "Quiz 2: Sexual Reproduction",
            questions: [
              { id: "q6", question: "Isogametes are...", options: ["Different sized gametes", "Similar gametes", "Only male gametes", "Only female gametes"], correctAnswer: 1 },
              { id: "q7", question: "Monoecious plants have...", options: ["Only male flowers", "Only female flowers", "Both male and female flowers", "No flowers"], correctAnswer: 2 },
              { id: "q8", question: "The juvenile phase is also called...", options: ["Reproductive phase", "Vegetative phase", "Senescent phase", "Dormant phase"], correctAnswer: 1 },
              { id: "q9", question: "Meiosis produces...", options: ["Diploid cells", "Haploid gametes", "Triploid cells", "Identical cells"], correctAnswer: 1 },
              { id: "q10", question: "External fertilization occurs in...", options: ["Humans", "Birds", "Frogs", "Reptiles"], correctAnswer: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    icon: TrendingUp,
    color: "subject-economics",
    description: "Micro and macroeconomics for Class 12",
    lessons: [
      {
        id: "eco-1",
        title: "Introduction to Microeconomics",
        content: "Microeconomics studies individual economic units — consumers, firms, and markets.\n\nCentral Problems of an Economy:\n1. What to produce? (Choice of goods)\n2. How to produce? (Choice of technique)\n3. For whom to produce? (Distribution)\n\nEconomic Systems:\n• Capitalist: Market forces decide (USA)\n• Socialist: Government decides (Cuba)\n• Mixed: Both market and government (India)\n\nOpportunity Cost: The value of the next best alternative foregone.\nProduction Possibility Frontier (PPF): Shows maximum combinations of two goods an economy can produce with given resources.",
        quizzes: [
          {
            id: "eco-1-q1",
            title: "Quiz 1: Basics",
            questions: [
              { id: "q1", question: "Microeconomics deals with...", options: ["National income", "Individual units", "Government budget", "International trade"], correctAnswer: 1 },
              { id: "q2", question: "India has a _____ economy.", options: ["Capitalist", "Socialist", "Mixed", "Traditional"], correctAnswer: 2 },
              { id: "q3", question: "Opportunity cost is...", options: ["Money spent", "Next best alternative foregone", "Total cost", "Fixed cost"], correctAnswer: 1 },
              { id: "q4", question: "PPF is also called...", options: ["Demand curve", "Supply curve", "Production possibility curve", "Cost curve"], correctAnswer: 2 },
              { id: "q5", question: "The central problem 'what to produce' relates to...", options: ["Technique", "Distribution", "Choice of goods", "Pricing"], correctAnswer: 2 },
            ],
          },
          {
            id: "eco-1-q2",
            title: "Quiz 2: Concepts",
            questions: [
              { id: "q6", question: "PPF slopes downward because of...", options: ["Unlimited resources", "Scarcity of resources", "Government policy", "Market forces"], correctAnswer: 1 },
              { id: "q7", question: "In capitalism, prices are determined by...", options: ["Government", "Market forces", "Producers only", "Consumers only"], correctAnswer: 1 },
              { id: "q8", question: "Marginal opportunity cost is...", options: ["Always constant", "Always increasing", "The slope of PPF", "Zero"], correctAnswer: 2 },
              { id: "q9", question: "A point inside PPF indicates...", options: ["Full employment", "Underutilization", "Over-production", "Impossible production"], correctAnswer: 1 },
              { id: "q10", question: "Economics is a _____ science.", options: ["Natural", "Social", "Physical", "Pure"], correctAnswer: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "computer",
    name: "Computer Science",
    icon: Monitor,
    color: "subject-computer",
    description: "Python, MySQL, and networking for Class 12",
    lessons: [
      {
        id: "cs-1",
        title: "Python Fundamentals",
        content: "Python is a high-level, interpreted programming language known for its simplicity and readability.\n\nData Types:\n• int, float, complex (Numeric)\n• str (String)\n• list, tuple, dict, set (Collections)\n• bool (Boolean)\n\nControl Structures:\n• if-elif-else (Conditional)\n• for loop (Iteration over sequences)\n• while loop (Condition-based iteration)\n\nFunctions: Defined using 'def' keyword. Can have default arguments, keyword arguments, and variable-length arguments (*args, **kwargs).\n\nFile Handling: open(), read(), write(), close()\nModes: 'r', 'w', 'a', 'rb', 'wb'",
        quizzes: [
          {
            id: "cs-1-q1",
            title: "Quiz 1: Python Basics",
            questions: [
              { id: "q1", question: "Python is a _____ language.", options: ["Compiled", "Interpreted", "Assembly", "Machine"], correctAnswer: 1 },
              { id: "q2", question: "Which is mutable in Python?", options: ["tuple", "string", "list", "int"], correctAnswer: 2 },
              { id: "q3", question: "The keyword to define a function is...", options: ["func", "define", "def", "function"], correctAnswer: 2 },
              { id: "q4", question: "Which mode opens a file for reading?", options: ["'w'", "'a'", "'r'", "'x'"], correctAnswer: 2 },
              { id: "q5", question: "Python uses _____ for code blocks.", options: ["Braces {}", "Parentheses ()", "Indentation", "Semicolons"], correctAnswer: 2 },
            ],
          },
          {
            id: "cs-1-q2",
            title: "Quiz 2: Advanced Python",
            questions: [
              { id: "q6", question: "**kwargs represents...", options: ["List of arguments", "Dictionary of keyword arguments", "A single argument", "No arguments"], correctAnswer: 1 },
              { id: "q7", question: "Which is immutable?", options: ["list", "dict", "tuple", "set"], correctAnswer: 2 },
              { id: "q8", question: "To handle exceptions, we use...", options: ["if-else", "try-except", "for loop", "def"], correctAnswer: 1 },
              { id: "q9", question: "len([1,2,3]) returns...", options: ["1", "2", "3", "6"], correctAnswer: 2 },
              { id: "q10", question: "SQL stands for...", options: ["Simple Query Language", "Structured Query Language", "Standard Query Logic", "System Query Language"], correctAnswer: 1 },
            ],
          },
        ],
      },
    ],
  },
];
