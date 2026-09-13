/**
 * Image Archive Database
 * 
 * Each entry owns its own 6-digit secret key.
 * Keys are strings to preserve potential leading zeros.
 * 
 * INTERNAL FIELDS (never rendered to DOM/UI):
 *   - category: used only for internal organization
 *   - isTarget: used only for data integrity checks
 * 
 * RENDERED TO DOM:
 *   - id → data-image-id attribute
 *   - code → data-secret-key attribute
 *   - image → img src
 */

const imageDatabase = [
  // ═══════════════════════════════════════════
  // TARGET ENTRIES (10) — Keys are IMMUTABLE
  // ═══════════════════════════════════════════
  { id: "IMG001", code: "731842", image: "/images/img001.webp", category: "Space", isTarget: true },
  { id: "IMG002", code: "673501", image: "/images/img002.webp", category: "Nature", isTarget: true },
  { id: "IMG003", code: "852307", image: "/images/img003.webp", category: "Navigation", isTarget: true },
  { id: "IMG004", code: "194628", image: "/images/img004.png", category: "Space", isTarget: true },
  { id: "IMG005", code: "928416", image: "/images/img005.png", category: "Nature", isTarget: true },
  { id: "IMG006", code: "406915", image: "/images/img006.webp", category: "Nature", isTarget: true },
  { id: "IMG007", code: "315784", image: "/images/img007.png", category: "Energy", isTarget: true },
  { id: "IMG008", code: "760293", image: "/images/img008.webp", category: "Mechanical", isTarget: true },
  { id: "IMG009", code: "541826", image: "/images/img009.png", category: "Mechanical", isTarget: true },
  { id: "IMG010", code: "283679", image: "/images/img010.webp", category: "Technology", isTarget: true },

  // ═══════════════════════════════════════════
  // ALTERNATE / DISTRACTOR CONCEPTS (30)
  // ═══════════════════════════════════════════
  { id: "IMG011", code: "583219", image: "/images/img011.webp", category: "Space", isTarget: false },
  { id: "IMG012", code: "147365", image: "/images/img012.webp", category: "Space", isTarget: false },
  { id: "IMG013", code: "629481", image: "/images/img013.webp", category: "Nature", isTarget: false },
  { id: "IMG014", code: "371958", image: "/images/img014.webp", category: "Technology", isTarget: false },
  { id: "IMG015", code: "814673", image: "/images/img015.webp", category: "Technology", isTarget: false },
  { id: "IMG016", code: "295740", image: "/images/img016.webp", category: "Technology", isTarget: false },
  { id: "IMG017", code: "463812", image: "/images/img017.webp", category: "Energy", isTarget: false },
  { id: "IMG018", code: "758394", image: "/images/img018.webp", category: "Mechanical", isTarget: false },
  { id: "IMG019", code: "182647", image: "/images/img019.webp", category: "Navigation", isTarget: false },
  { id: "IMG020", code: "934156", image: "/images/img020.webp", category: "Space", isTarget: false },
  { id: "IMG021", code: "527463", image: "/images/img021.webp", category: "Technology", isTarget: false },
  { id: "IMG022", code: "841295", image: "/images/img022.webp", category: "Science", isTarget: false },
  { id: "IMG023", code: "369182", image: "/images/img023.webp", category: "Nature", isTarget: false },
  { id: "IMG024", code: "614927", image: "/images/img024.webp", category: "Nature", isTarget: false },
  { id: "IMG025", code: "472518", image: "/images/img025.webp", category: "Nature", isTarget: false },
  { id: "IMG026", code: "193847", image: "/images/img026.webp", category: "Nature", isTarget: false },
  { id: "IMG027", code: "856312", image: "/images/img027.webp", category: "Energy", isTarget: false },
  { id: "IMG028", code: "748291", image: "/images/img028.webp", category: "Technology", isTarget: false },
  { id: "IMG029", code: "261534", image: "/images/img029.webp", category: "Energy", isTarget: false },
  { id: "IMG030", code: "917428", image: "/images/img030.webp", category: "Mechanical", isTarget: false },
  { id: "IMG031", code: "385162", image: "/images/img031.webp", category: "Nature", isTarget: false },
  { id: "IMG032", code: "649715", image: "/images/img032.webp", category: "Mechanical", isTarget: false },
  { id: "IMG033", code: "528341", image: "/images/img033.webp", category: "Mechanical", isTarget: false },
  { id: "IMG034", code: "714968", image: "/images/img034.webp", category: "Technology", isTarget: false },
  { id: "IMG035", code: "392847", image: "/images/img035.webp", category: "Technology", isTarget: false },
  { id: "IMG036", code: "186429", image: "/images/img036.webp", category: "Technology", isTarget: false },
  { id: "IMG037", code: "453791", image: "/images/img037.webp", category: "Technology", isTarget: false },
  { id: "IMG038", code: "729618", image: "/images/img038.webp", category: "Nature", isTarget: false },
  { id: "IMG039", code: "361847", image: "/images/img039.webp", category: "Mechanical", isTarget: false },
  { id: "IMG040", code: "594821", image: "/images/img040.webp", category: "Nature", isTarget: false },

  // ═══════════════════════════════════════════
  // ADDITIONAL UNRELATED DISTRACTORS (25)
  // ═══════════════════════════════════════════
  { id: "IMG041", code: "428173", image: "/images/img041.webp", category: "Mechanical", isTarget: false },
  { id: "IMG042", code: "619385", image: "/images/img042.webp", category: "Science", isTarget: false },
  { id: "IMG043", code: "273514", image: "/images/img043.webp", category: "Space", isTarget: false },
  { id: "IMG044", code: "847261", image: "/images/img044.webp", category: "Science", isTarget: false },
  { id: "IMG045", code: "516948", image: "/images/img045.webp", category: "Navigation", isTarget: false },
  { id: "IMG046", code: "384729", image: "/images/img046.webp", category: "Energy", isTarget: false },
  { id: "IMG047", code: "762415", image: "/images/img047.webp", category: "Navigation", isTarget: false },
  { id: "IMG048", code: "153896", image: "/images/img048.webp", category: "General", isTarget: false },
  { id: "IMG049", code: "894217", image: "/images/img049.webp", category: "General", isTarget: false },
  { id: "IMG050", code: "437168", image: "/images/img050.webp", category: "Technology", isTarget: false },
  { id: "IMG051", code: "571832", image: "/images/img051.webp", category: "Mechanical", isTarget: false },
  { id: "IMG052", code: "628497", image: "/images/img052.webp", category: "Technology", isTarget: false },
  { id: "IMG053", code: "319574", image: "/images/img053.webp", category: "Technology", isTarget: false },
  { id: "IMG054", code: "745281", image: "/images/img054.webp", category: "Technology", isTarget: false },
  { id: "IMG055", code: "896143", image: "/images/img055.webp", category: "Mechanical", isTarget: false },
  { id: "IMG056", code: "284637", image: "/images/img056.webp", category: "Energy", isTarget: false },
  { id: "IMG057", code: "953718", image: "/images/img057.webp", category: "Technology", isTarget: false },
  { id: "IMG058", code: "167842", image: "/images/img058.webp", category: "Navigation", isTarget: false },
  { id: "IMG059", code: "432976", image: "/images/img059.webp", category: "Science", isTarget: false },
  { id: "IMG060", code: "785412", image: "/images/img060.webp", category: "Science", isTarget: false },
  { id: "IMG061", code: "318564", image: "/images/img061.webp", category: "General", isTarget: false },
  { id: "IMG062", code: "674213", image: "/images/img062.webp", category: "Technology", isTarget: false },
  { id: "IMG063", code: "529847", image: "/images/img063.webp", category: "Technology", isTarget: false },
  { id: "IMG064", code: "891326", image: "/images/img064.webp", category: "Energy", isTarget: false },
  { id: "IMG065", code: "247538", image: "/images/img065.webp", category: "Nature", isTarget: false },
  { id: "IMG066", code: "827194", image: "/images/img066.jpg", category: "Space", isTarget: false },
  { id: "IMG067", code: "493821", image: "/images/img067.webp", category: "Space", isTarget: false },
  { id: "IMG068", code: "618392", image: "/images/img068.jpeg", category: "Navigation", isTarget: false },
  { id: "IMG069", code: "572184", image: "/images/img069.jpeg", category: "Mechanical", isTarget: false },
  { id: "IMG070", code: "931476", image: "/images/img070.jpg", category: "Technology", isTarget: false },
  { id: "IMG071", code: "284615", image: "/images/img071.jpg", category: "Science", isTarget: false },
  { id: "IMG072", code: "749253", image: "/images/img072.jpg", category: "Science", isTarget: false },
  { id: "IMG073", code: "361948", image: "/images/img073.avif", category: "Science", isTarget: false },
  { id: "IMG074", code: "158372", image: "/images/img074.jpg", category: "Space", isTarget: false },
  { id: "IMG075", code: "846219", image: "/images/img075.webp", category: "Nature", isTarget: false },
  { id: "IMG076", code: "429185", image: "/images/img076.jpeg", category: "Space", isTarget: false },
  { id: "IMG077", code: "693527", image: "/images/img077.jpg", category: "Technology", isTarget: false },
  { id: "IMG078", code: "517436", image: "/images/img078.png", category: "Technology", isTarget: false },
];

export default imageDatabase;
