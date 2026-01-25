
const prisma = new PrismaClient();

const researchData = [
  {
    title: "CRUDE PROTEIN CONTENT OF RENZONII (Desmodium cinereum) GROWN IN CABATUAN, ILOILO",
    publishedAt: 2023,
    author: "JULIA MARIE G. SOLIS, RHAINE P. SABOSO, ANGEL FREANE O. GONZAGA, CZARINA CHRISSEL A. ORTEGA, JHON LAURENCE V. SEPAYA, MARK ANGELO P. GUARTIZO, NICO T. BELENIO, ROGENE AHRON SEGURA",
    abstract: "This study aimed to determine the crude protein content of Desmodium cinereum grown in Cabatuan, Iloilo. Kjehldal method was used for analysis. Results revealed that the average crude protein percentage is 21.23%."
  },
  {
    title: "DALUPANG (Urena lobata L.) BAST FIBERS AS AN ALTERNATIVE ECO-BAG MATERIAL",
    publishedAt: 2023,
    author: "CARLA ROSSI T. BUÑOL, HYRA S. MEDIODIA, KYLE KIRBY J. ALEGRIA, ERICKA JANELLE E. AQUINO, JESSA MAE P. BENDOR, RICK LAWRENCE M. CABALLERO, JESTER JAMES T. MAYUGA, ELIZABETH A. ORDOYO",
    abstract: "This study tested Dalupang bast fibers as an alternative eco-bag material. Fibers were soaked in various NaOH solutions. Results show that fibers soaked in NaOH are stronger than the control, though ANOVA showed no significant difference among treatments."
  },
  {
    title: "POTENTIAL OF RICE HUSK AS A PACKAGING MATERIAL",
    publishedAt: 2023,
    author: "SOPHIA BIANCA BAÑAS, JOYCE ANGELA CORDERO, JOHN JONAS DIMALANTA, IAN MARVIN HUBAG, MARIA LENZY LAZANGUE, SARAH JANE NIEMBRA, KENT LEOMAR ORTEGA, BEAULLE RACHELLE PARCON",
    abstract: "This research evaluates rice husk as a packaging material using different proportions of husk, cornstarch, and glue. Treatment C was favored for color/texture and showed significantly higher tensile strength than the control."
  },
  {
    title: "BAMBOO (Bambusa blumeana) LEAVES FIBER FILTER FOR FACEMASK",
    publishedAt: 2023,
    author: "VINCENT L. CORPES JR., KEZIAH CHARISSE A. ALABE, XIAN ZACHARY A. DELA CRUZ, JESSA Q. BARRERA, CHARLENE G. FERRO, CHARLOTTE G. FERRO, ROSE ANN C. LAVARRO",
    abstract: "Assessed bamboo leaf fiber filters for facemasks compared to meltblown polypropylene. T-test showed no significant difference in filtration efficiency. The filter is biodegradable and also potential for packaging or paper."
  },
  {
    title: "BIO-PHOTOVOLTAIC POTENTIAL OF CAMACHILE (Pithecellobium dulce) LEAF EXTRACT AS A DYE SENSITIZER",
    publishedAt: 2023,
    author: "IVAN JOSH A. ABBU, THOMAS BENEDICT A. ESTEVA, JAMES F. LEÑAR, KYRA SHIENELLE F. CONTINENTE, KATRINA L. CATALUÑA, LOUISE MARIELLE V. DORADO, JESSEL X' ELMNENAH ILISAN",
    abstract: "Investigated Camachile leaf extract as a dye sensitizer for solar cells (DSSC). ANOVA and Dunnett's test revealed voltage outputs significantly higher than negative control and comparable to the positive control (Rhodamine B)."
  },
  {
    title: "ASSESSMENT OF TAWAS (Potassium Alum Sulfate) WITH ALUSIMAN (Portulaca oleracea) LEAF EXTRACT AS TREATMENT FOR HOUSEHOLD WASTEWATER",
    publishedAt: 2023,
    author: "ALLIAN KURT RETERACION, LG SAPITANAN, AIMA THERESE BUÑI, SHELYN JABONE, MIKAILA KASSANDRA LABATA, CLAIRE MONEGRO, FRANCINE NATHALIE ORDOYO, EJ VELASCO",
    abstract: "Determined flocculating ability of Alusiman leaf extract. Results showed effects on turbidity and pH but failed microbiological standards set by WHO and PNSDW. Concluded Alusiman is not an effective flocculant."
  },
  {
    title: "INSECTICIDAL EFFECT OF APOK-APOK (Ageratum conyzoides) LEAF EXTRACTION ALBINO FRUIT FLY (Drosophila melanogaster)",
    publishedAt: 2023,
    author: "RHEA SHANE P. CUAMBOT, DAN LOYD A. BECODO, TRISHA MARIE BEDAURIE, ERIKA MAE M. ALVIAR, CHELLEAN JOY A. DURAN, NOELA JANE P. FAJARDO, GUINEVERE A. CERENECHE, PEARL JOY M. AZUCENA",
    abstract: "Tested Ageratum conyzoides leaf extract against fruit flies. Only the 50 mg/mL concentration showed insecticidal effects after one hour. Significant differences were noted compared to commercial killers."
  },
  {
    title: "ANTI-MICROBIAL ACTIVITY OF Averrhoa carambola (GARANGAN) LEAF EXTRACT ON Pseudomonas spp.",
    publishedAt: 2023,
    author: "DIONGLAY, FLOEY JOHN M., LOPEZ, ERL ANDREI V., RABAGO, JAMES BERNARD S., AGRETE, JEANIE ROSE B., CASTELLANO, KASSANDRA THERESE T., MARCON, MA. JULIA ZONET, SAUL, CLAIRE IRISH G.",
    abstract: "Tested Garangan leaf extract using agar-well diffusion. All experimental treatments formed zones of inhibition against Pseudomonas spp. higher than the negative control, indicating potential antimicrobial activity."
  },
  {
    title: "ANTIPYRETIC ACTIVITY OF PANSIT-PANSITAN (Peperomia pellucida) AND FRINGED SPIDERFLOWER (Cleome rutidosperma) LEAF EXTRACTS ON WHITE MICE (Mus musculus)",
    publishedAt: 2023,
    author: "AINA YSABEL L. VELONERO, BERNICE CARMELLE SONZA, DUANE RYANN P. MONTES, FRANCINE GABRIELLE S. LUCES, JAN MARGAUX P. PERUCHO, ALLEN KARL L. GARRINO, ARABELLA GRACE A. SILVIAS, BIANCA ISABELLA L. VALLE",
    abstract: "Aimed to determine antipyretic activity on pyrexia-induced white mice. Fringed Spiderflower showed the highest mean decrease in temperature, followed by Pansit-pansitan, though results were not significantly different from the control."
  },
  {
    title: "UTILIZATION OF DIFFERENT AGRICULTURAL WASTES (MAHOGANY SAWDUST, PEANUT SHELLS, AND BAMBOO FIBER WASTES) AS NATURAL SORBENT PILLOWS ON OIL SPILL",
    publishedAt: 2023,
    author: "CAMILLE JOY S. MANDARIO, STEPHANIE MAE F. RETERACION, JAMES BRYAN S. RABAGO, JANINE KATE M. PORTILLO, CLARISSA C. RICAFRENTE, SAMANTHA JOY P. ROSANO, LOVE MARIE C. MORATA, JOSE ISAAC M. MENDOZA",
    abstract: "Tested agricultural wastes as natural sorbents for oil spills. While Bamboo Fiber Wastes had the highest mean sorption capacity, ANOVA showed no significant difference, suggesting all materials are comparable."
  },
  {
    title: "EFFECT OF DIETARY INCLUSION OF ACAPULCO LEAVES (Senna alata) ON GROWTH PERFORMANCE OF NATIVE CHICKENS (Gallus gallus domesticus)",
    publishedAt: 2023,
    author: "RIZANY EMVER G. BOGADOR, RHYZA MARIE B. HERVAS, FRANCINE MAE D. BEGAYO, MARY BIANCE B. BALDEVISO, LYAN MARIE F. APISTAR, RONIEL A. GARETE, PAULA ISABELLE B. LIBUTAQUE, CHRISTINE JOY M. CERIGO",
    abstract: "Evaluated dietary inclusion of Acapulco leaves on growth. Results showed Treatment B had significantly higher feed conversion efficiency, though Treatment A (control) had higher voluntary feed intake and weight gain."
  },
  {
    title: "AUTOMATIC WATER LEVEL SENSOR",
    publishedAt: 2023,
    author: "BLITZKRIEG ZITHER BARRIOS, KELMER ETHAN BRAVIO, ALJOHN CANOY, CARL JOHN COOPERA, GERALD DILAG, PHILINE GRACE AGUIRRE, RINAMAE EMBIADO, LHEA JOY INEFABLE",
    abstract: "Evaluated reliability of an automatic water level sensor for aquaculture. 50 trials showed a 91.7% reliability rate. High potential for optimizing fish growth and minimizing water wastage."
  },
  {
    title: "ANTIPROLIFERATIVE ACTIVITY OF JUTE (Corchorus olitorius) LEAF EXTRACT ON YEAST (Saccharomyces cerevisiae)",
    publishedAt: 2023,
    author: "LARA MAE DELOS REYES, JUSTIN JONES BREY, SEAN KAIZER FRIGILLANO, REAN ALICANTE, CALVIN JOHN FORTALEZA, ELIZABETH CENTINA, MAE JUNE GALINDO, ALLEN GRACE CARTERA",
    abstract: "Determined antiproliferative potential of methanolic jute leaf extract. Treatment 3 (1000 ug/ml) showed the lowest cell viability, concluding it has the highest antiproliferative activity."
  },
  {
    title: "ACCEPTABILITY OF TAHONG (Perna viridis) SHELLS AND ACHIOTE (Bixa orellana) SEED EXTRACT AS TAILOR'S CHALK",
    publishedAt: 2023,
    author: "FEBRUALYN SALVE C. TORMON, CLAUDE MONETTE B. GUBAGARAS, MARY GRACE M. SUNIO, JOHN RICO B. ANACAN, KARYLLE H. GUILAMO, MARIBETH M. LLADO, JOHN PAUL F. DERECHO",
    abstract: "Determined acceptability of pulverized Tahong shells and Achiote seed extract as tailor's chalk. Survey results showed acceptability in texture and ease of marking, with no significant difference among experimental treatments."
  },
  {
    title: "ANTHELMINTIC ACTIVITY OF POWDERED TAMARIND (Tamarindus indica) SEEDS AND OREGANO (Origanum vulgare) LEAVES ON NATIVE CHICKEN",
    publishedAt: 2023,
    author: "PRINCESS BEA T. ALINSOG, MARY ANN B. JUCABAN, TRISCIA KATE C. LANDA, CHELSEA EMMANUELLE D. LORCA, SOFIA THERESSE B. NADALES, JOAN RUSS T. PALOMERO, KRISTY ANGELIE M. SALAZAR, HUNNAH KAYE M. SOLIVA",
    abstract: "Tested anthelmintic activity of tamarind seeds and oregano leaves on native chickens. ANOVA showed no significant difference among treatments, concluding both materials possess comparable anthelmintic activity."
  },
  {
    title: "THE VALUE OF HEAT PRODUCED BY BIOGAS GENERATED FROM FARM WASTE VIA AN AEROBIC DIGESTION",
    publishedAt: 2023,
    author: "CARLA ANGELA F. HEREZO, MURIEL EZRI M. GUIJARNO, ARLENE MAY A. LINACERO, URIEL L. TIONGSON, FEBE SHAINE O. TRONCO, XIANELLE M. DOMINGUEZ, JOSHUA L. SOLACITO, JANREL M. BERBEGAL",
    abstract: "Determined calories produced by biogas from pig and cow dung. Results showed pig dung generated ~7252 calories and cow dung ~5108 calories. T-test revealed no significant difference, making them viable heating fuel alternatives."
  },
  {
    title: "ANTIBACTERIAL EFFECT OF BAMBOO SHOOT (Bambusa blumeana) EXTRACT AGAINST STAPH (Staphylococcus aureus)",
    publishedAt: 2023,
    author: "JOHN VINCENT P. MAROMA, DENZEL KIM C. SISON, FRANZ EARL M. SUDARIO, THEA MARIE J. VILLAREAL, JOHN ROMNICK L. MORCO, KHAYLIN MONIQUE ANGELA M. LUZARITA, RHAY BENNARD R. MENDOZA, TREXAN V. SANICO",
    abstract: "Determined antibacterial effect using various concentrations. All treatments except negative control formed zones of inhibition. The 75% concentration showed the highest zone of inhibition against Staphylococcus aureus."
  },
  {
    title: "Magallana bilineata (OYSTER) SHELLS AND ACETIC ACID (VINEGAR) FIRE RETARDANT SPRAY AS FIRE ASPHYXIATOR",
    publishedAt: 2023,
    author: "ASHLEY JUNE M. MONTALBAN, ALEA NICOLE C. FAJARDO, FRANCIS C. ROMALLOSA, LARA MAY S. MEDIODA, JEZYL R. SIMAURIO, JERGEN ATHEA Q. TITULAR, GHIA D. BERBEGAL",
    abstract: "Tested oyster shells and vinegar spray as a fire asphyxiator on Class A fires. T-test revealed no significant difference compared to commercial extinguishers, concluding the spray is an effective alternative."
  },
  {
    title: "POLYHERNIC: A FORMULATED ORGANIC AND POLYHERBAL HAIR CONDITIONER",
    publishedAt: 2023,
    author: "MARIE C. MIRALLES, SHYRA B. CABUATAN, MEGAN E. TIONGSON, GRACE AMOR C. TEJING, KYTE FRANSCINE L. RIVERA, VINCE CYRON C. RENDAJE, TJAY C. LAS, PAUL DANIELLE B. VESTUIR",
    abstract: "Developed an organic polyherbal hair conditioner. T-test on human hair samples showed no significant difference compared to commercial conditioners in terms of smoothness, shine, and manageability."
  }
];

async function main() {
  console.log('Start seeding 2023 research entries...');
  
  await prisma.research.deleteMany();
  console.log('Cleared existing data.');

  for (const data of researchData) {
    const research = await prisma.research.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        author: data.author,
        publishedAt: data.publishedAt,
      },
    });
    console.log(`Seeded: ${research.title.substring(0, 40)}...`);
  }
  
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });