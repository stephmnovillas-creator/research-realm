
const prisma = new PrismaClient();

const researchData = [
  {
    title: "ANTIFUNGAL ACTIVITY OF BITTER VINE (Mikania micrantha) LEAF EXTRACT ON Aspergillus flavus",
    publishedAt: 2018,
    author: "SHEIMIL B. MADRONES, JAN ALEXIS J. ARROYO, MAREX C. FAJARDO",
    abstract: "This study aims to know the antifungal activity of bitter vine (mikania micrantha) leaf extract on aspergillus flavus. Results revealed that 100% and 50% extract showed antifungal activity. The researchers concluded that 100% and 50% bitter vine leaf extract had an antifungal activity on aspergillus flavus."
  },
  {
    title: "ANTIFUNGAL ACTIVITY OF GUYABANO (Annona muricata) LEAF EXTRACT ON Aspergillus flavus",
    publishedAt: 2018,
    author: "MILDRED M. MONTALBAN, REINA DANECCA P. PLANCO",
    abstract: "This study aimed to find out the antifungal activity of guyabano leaf extract on Aspergillus flavus. Results revealed that 50% and 100% concentrations were effective, with 50% being the most effective."
  },
  {
    title: "CYTOTOXIC ACTIVITY OF GUAVA, JACKFRUIT AND COCONUT LEAVES EXTRACT USING BRINE SHRIMP LETHALITY ASSAY",
    publishedAt: 2018,
    author: "JESSA MAE S. LOPEZ, PEARL VENICE C. SEPAYA, CRYSTELLE ANN R. MARQUILENCIA",
    abstract: "Fresh Psidium guajava, Artocarpus heterophyllus and Cocos nucifera leaves were tested. Results revealed that the ethanolic extracts showed good brine shrimp cytotoxic activity (LC50 values below 1000 ug/mL)."
  },
  {
    title: "THE PESTICIDAL EFFECT OF SKY FRUIT, CHILI PEPPER, AND BETEL LEAVES POWDER ON GOLDEN APPLE SNAILS",
    publishedAt: 2018,
    author: "JHISTINE CLYDE A. BLANCAFLOR, JIMSON G. KUSOG, NOVELYN R. CLAMOR",
    abstract: "Sky fruit powder and commercial pesticides showed the greatest number of dead snails. ANOVA revealed sky fruit powder has a high significant effect on killing golden apple snails."
  },
  {
    title: "PESTICIDAL EFFECT OF MAKABUHAY (Tinospora rumphii Boerl) ON THE PHILIPPINE MILK TERMITES",
    publishedAt: 2018,
    author: "KRISTINE VERL S. MANDARIO",
    abstract: "The study used 150g, 300g, and 400g concentrations of stem extract. Results show that makabuhay stem extract is effective in killing Philippine milk termites."
  },
  {
    title: "THE POTENTIAL OF PEANUT (Arachis hypogaea) SHELL STARCH AS A COMPONENT IN MAKING BIO-PLASTIC",
    publishedAt: 2018,
    author: "CYRA JANNE C. MASCULIN, AELRED MAURICE R. TORMON, EMMANUEL M. ESCAÑO JR.",
    abstract: "Various treatments using peanut shell starch solution were tested. Results revealed that peanut shell starch is not an effective component due to the resulting bio-plastic's fragility."
  },
  {
    title: "ANTIBACTERIAL ACTIVITY OF AHITO (Tagetes erecta) LEAF OINTMENT ON Staphylococcus aureus",
    publishedAt: 2018,
    author: "ERBIE MARIE S. RANGAS, JONNAH G. PADILLA, ALEHA MARIE H. ANGELADA",
    abstract: "This research assessed the effectiveness of Ahito leaf ointment against Staphylococcus aureus skin infections. It discusses how bacteria normally reside on the skin but can cause infections like cellulitis or boils."
  },
  {
    title: "EFFECTIVENESS OF COMPLETE IDENTITY INFORMATION BAR CODE SYSTEM VERSUS MANUAL CHECKING",
    publishedAt: 2018,
    author: "ALVIE JOHN P. ALAG, SCHARLET T. LIPA, JAMES IVAN P. SUMINGIT",
    abstract: "Tested at the senior high guard house, results revealed that time spent authenticating student information was significantly reduced compared to manual checking."
  },
  {
    title: "ANTIFUNGAL EFFECT OF HAUILI (Ficus septica blanco) LEAF EXTRACT",
    publishedAt: 2018,
    author: "JANINE SEPTER D. PADILLA, SAILESA G. SAMAR, RANNILYN P. NAVIO",
    abstract: "One kilogram of Hauili leaves was extracted via rotary evaporation. Results revealed that 100% and 50% concentrations showed antifungal activity against Aspergillus flavus."
  },
  {
    title: "AN ASSESSMENT ON THE COLOR CHANGE OF BLUE TERNATE FLOWER EXTRACT AS NATURAL PH INDICATORS",
    publishedAt: 2018,
    author: "JOHN JOSHUA C. DE GUIA, JULIA SHANE R. BARRIOS, JUN SUN A. MAGEANAM",
    abstract: "Findings showed that Blue Ternate (Clitoria ternatea) pH indicators demonstrate color change when subjected to solutions with different pH values from 0 to 14."
  },
  {
    title: "TURMERIC (Curcuma longa) EXTRACT AS AN ANTIBACTERIAL FOR Staphylococcus epidermidis",
    publishedAt: 2018,
    author: "PAMELA SUE HILADA, BASHRACEL MARIE SALMORIN, DANICA DANIELE SERRANO",
    abstract: "Agar well diffusion was used to test various concentrations. Turmeric extract showed an antibacterial effect on Staphylococcus epidermidis in terms of zone of inhibition."
  },
  {
    title: "BLOOD CLOTTING POTENTIAL OF (Gliricidia sepium) LEAF AND CAMBIUM EXTRACT",
    publishedAt: 2018,
    author: "EMMANUEL J. JORDAN, SHAINA FAITH S. LAQUIHON, CARL JOVE PINEDA",
    abstract: "Utilized Lee-White's Method. ANOVA revealed no significant difference in clotting time compared to normal blood, and in some cases, it took longer for the blood to clot."
  },
  {
    title: "EFFECTIVENESS OF MOBILE ACTIVATED POWER SWITCH (MAPS)",
    publishedAt: 2018,
    author: "JESSIE ANN C. BERONDO, JOEY F. CABALLERO, NOVIE MARIE M. BEÑARES",
    abstract: "A remote-controlled device tested at a distance of 3km. Results showed the device is effective in saving time, energy, and money compared to manual switching."
  },
  {
    title: "THE ACCEPTABILITY OF COCONUT (Cocos nucifera) OIL AS A SHOE POLISH",
    publishedAt: 2018,
    author: "CHRISTINE JOY C. PATCHES, SAINT PATRICK P. ENERIO, PERCY ANNE A. HUESCA",
    abstract: "Tested by 20 students. Coconut oil shoe polish was found acceptable in terms of effect, duration of shine, and smell compared to commercial products."
  },
  {
    title: "FUNGICIDAL ACTIVITY OF THE DIFFERENT CONCENTRATIONS OF SEA SALT SOLUTION ON Candida albicans",
    publishedAt: 2018,
    author: "ELLAINE RARE M. JUNIO",
    abstract: "Agar Well Diffusion was used for testing. Results showed that different concentrations of sea salt solution have no antifungal effect on Candida albicans."
  },
  {
    title: "COCONUT OIL (Cocos nucifera) AS AN EFFECTIVE HOUSEFLY (Musca domestica) ELMINATOR",
    publishedAt: 2018,
    author: "KENYA M. COMEDA",
    abstract: "Determined the effectiveness of coconut oil versus a chemical solution. Analysis showed coconut oil is effective in killing houseflies through multiple trials."
  },
  {
    title: "ANTIBACTERIAL EFFECT OF SINAW SINAW (Peperomia pellucida) LEAF EXTRACT ON Staphylococcus aureus",
    publishedAt: 2018,
    author: "KATRINA ANN L. DELA TORRE, SIERRA MAY M. BABIARTE",
    abstract: "Tested various concentrations. Results showed that 100% pure Sinaw sinaw leaf extract is the most effective antibacterial treatment against Staphylococcus aureus."
  },
  {
    title: "ANTI-ANGIOGENIC ACTIVITY OF CALABASH (Crescentia cujete) LEAF EXTRACT",
    publishedAt: 2018,
    author: "FRANCIS MATHEW M. GAPPE, MARVIN B. MALIFICIAR, CAMELLA BEATRICE L. VALLE",
    abstract: "Used in ovo (Anas platyrhynchos) CAM assay. Results revealed Calabash leaf extract exhibits anti-angiogenic activity significantly different from the negative control."
  },
  {
    title: "ANTIMICROBIAL EFFECT OF PARAGIS (Eleusine indica Linn.) GRASS EXTRACT ON UTI-CAUSING BACTERIA",
    publishedAt: 2018,
    author: "SEAN ANJELO C. HALABA, CIARA MARIE C. BERNARDO, JEAN RAY D. REYES",
    abstract: "Paragis grass was extracted using a juicer. Results showed that the grass extract had no antimicrobial effect on Escherichia coli in terms of zone of inhibition."
  },
  {
    title: "CYTOTOXICITY AND ANTI-ANGIOGENIC ACTIVITY OF TUBLI (Derris elliptica Benth.) LEAF EXTRACT",
    publishedAt: 2018,
    author: "ROMNICK A. SULIT, JESSA G. ALEMANI NOVIE, JENDEL M. SALIGANAN",
    abstract: "Determined LC50 for Tubli leaf extract (160.349 g/mL), showing significant cytotoxic activity. 200 and 300 ppm treatments showed significant anti-angiogenic activity."
  },
  {
    title: "EFFECTIVENESS OF PAPAYA (Carica papaya Linn.) LEAF EXTRACT AS A BLOOD COAGULANT",
    publishedAt: 2018,
    author: "CARL ANDRAE A. JULIANO, RHYZA C. PASADILLA, JHUN CARL N. PANIZA",
    abstract: "Tested on human blood types A, B, AB, and O. It was concluded that papaya leaf extract is not effective as a general blood coagulant across all types tested."
  },
  {
    title: "PESTICIDAL EFFECT OF HAGONOY (Chromolaena odorata) IN MOSQUITO (Culicidae)",
    publishedAt: 2018,
    author: "KIMBERLY E. LLADO, JOHN RENZ P. HEREZO",
    abstract: "Pesticide made by pounding Hagonoy and squeezing extract. Based on results, the extract can be used as a safer pesticide to kill mosquitoes."
  },
  {
    title: "LARVICIDAL ACTIVITY OF KAYOS (Dioscorea hispida) LEAF EXTRACT ON MOSQUITO WRIGGLERS",
    publishedAt: 2018,
    author: "JUDY M. SUBANG, ARNIE GRACE Q. MORENO",
    abstract: "Ethanolic extract tested against wrigglers. Results showed 1000 ppm extract significantly affected mortality, with an LC50 of 1055.513 ppm after 48 hours."
  },
  {
    title: "POWDERED TALABA (Crossastrea gigas) SHELL AS A COMPONENT IN MAKING CANDLES",
    publishedAt: 2018,
    author: "KENNETH A. TIONGSON, SHENNA I. SOBRETODO, LILIBEN JOHN C. VERA",
    abstract: "Tested powdered shell mixed with wax. Results revealed the addition of powdered Talaba shell has no significant effect on how long the candle lasts."
  },
  {
    title: "EFFECTIVENESS OF DALANGHITA, LEMONGRASS AND OREGANO AS INSECTICIDAL SPRAY ON TERMITES",
    publishedAt: 2018,
    author: "ELLA SALADAR, PRINCESS GELIN, MAEGAN VALERIE GENIT",
    abstract: "Results revealed Dalanghita peel, Lemongrass, and Oregano leaf extracts have the same significant insecticidal effect against Dampwood termites."
  },
  {
    title: "ISOLATION AND IDENTIFICATION OF AIRBORNE BACTERIA AROUND AND WITHIN THE LANDFILL",
    publishedAt: 2018,
    author: "COLLEEN KATE D. LICERA, CHENNIE M. PASTRANA, ROMELA MARIE P. MANATE",
    abstract: "Airborne bacteria isolated from Brgy. Inaladan landfill include E. faecalis, E. coli, E. aerogenes, K. pneumonieae, and Staphylococcus aureus."
  },
  {
    title: "QUALITATIVE COLOR CHANGE ASSESSMENT OF BANANA BLOSSOM BRACTS PIGMENT AS PH INDICATORS",
    publishedAt: 2018,
    author: "ATHENA BEATRICE R. ABORDO, FREDDIRICK ERL B. PLAMIANO",
    abstract: "Banana blossom can be a source of pigment for pH paper and liquid indicators, showing versatility in detecting pH levels in commercial solutions."
  },
  {
    title: "THE BIODEGRADABILITY OF RIPE SABA BANANA FRUIT PEELINGS TREATED WITH HYDROCHLORIC ACID",
    publishedAt: 2018,
    author: "CHARLENE B. NIEBLA, THERESE MARIE B. GABASA",
    abstract: "Tested various concentrations of HCI. Results showed that the higher the concentration of HCI, the faster the banana peels degrade into bioplastic."
  },
  {
    title: "ANTI-OXIDATIVE PROPERTY OF TALISAY (Terminalia catappa) LEAF EXTRACT",
    publishedAt: 2018,
    author: "RECHEL MAE P. SUBADE, ALLIAH KAY V. MENDOZA, JONA ANN C. CAMIN",
    abstract: "The DPPH radical scavenging method was used. Methanolic extracts of Talisay leaves showed a high anti-oxidative property (DPPH scavenging effect)."
  }
];

async function main() {
  console.log('Start seeding 31 research entries...');
  
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