export const constellations = [
  {
    id: "Ori",
    name: "Orion",
    meaning: "The Hunter",
    mythology: "In Greek mythology, Orion was a giant huntsman placed among the stars by Zeus. He boasted he could kill every animal on Earth, which angered Gaia who sent a scorpion to defeat him. Orion and Scorpius were placed on opposite sides of the sky so they would never meet again.",
    bestMonth: 1,
    hemisphere: "both",
    stars: ["betelgeuse", "rigel", "bellatrix", "saiph", "alnilam", "alnitak", "mintaka"],
    lines: [
      ["betelgeuse", "bellatrix"],
      ["betelgeuse", "alnilam"],
      ["bellatrix", "mintaka"],
      ["mintaka", "alnilam"],
      ["alnilam", "alnitak"],
      ["alnitak", "saiph"],
      ["rigel", "mintaka"],
      ["saiph", "alnilam"],
      ["rigel", "alnilam"]
    ],
    ra: 85.0,
    dec: 0.0
  },
  {
    id: "UMa",
    name: "Ursa Major",
    meaning: "The Great Bear",
    mythology: "Zeus fell in love with the nymph Callisto and transformed her into a bear to hide her from Hera's jealousy. Her son Arcas nearly killed her while hunting, so Zeus placed them both in the sky. Hera, still angry, convinced Poseidon never to let the bear bathe in the sea, which is why Ursa Major never sets below the horizon at northern latitudes.",
    bestMonth: 4,
    hemisphere: "north",
    stars: ["dubhe", "merak", "phecda", "megrez", "alioth", "mizar", "alkaid"],
    lines: [
      ["dubhe", "merak"],
      ["merak", "phecda"],
      ["phecda", "megrez"],
      ["megrez", "dubhe"],
      ["megrez", "alioth"],
      ["alioth", "mizar"],
      ["mizar", "alkaid"]
    ],
    ra: 180.0,
    dec: 55.0
  },
  {
    id: "UMi",
    name: "Ursa Minor",
    meaning: "The Little Bear",
    mythology: "Ursa Minor represents Arcas, son of Callisto, who was placed in the sky alongside his mother. The tip of the bear's tail is Polaris, the North Star, which has guided navigators for centuries. In some traditions, the constellation was known as the Dog's Tail or the Fish.",
    bestMonth: 6,
    hemisphere: "north",
    stars: ["polaris", "kochab", "pherkad", "epsilon-umi", "delta-umi", "zeta-umi", "eta-umi"],
    lines: [
      ["polaris", "delta-umi"],
      ["delta-umi", "epsilon-umi"],
      ["epsilon-umi", "zeta-umi"],
      ["zeta-umi", "eta-umi"],
      ["eta-umi", "pherkad"],
      ["pherkad", "kochab"],
      ["kochab", "zeta-umi"]
    ],
    ra: 225.0,
    dec: 80.0
  },
  {
    id: "Cas",
    name: "Cassiopeia",
    meaning: "The Queen",
    mythology: "Cassiopeia was a vain queen who boasted that she and her daughter Andromeda were more beautiful than the sea nymphs. This angered Poseidon, who sent a sea monster to ravage the coast. As punishment, Cassiopeia was placed in the sky on her throne, condemned to circle the pole and sometimes hang upside down.",
    bestMonth: 11,
    hemisphere: "north",
    stars: ["schedar", "caph", "gamma-cas", "ruchbah", "segin"],
    lines: [
      ["caph", "schedar"],
      ["schedar", "gamma-cas"],
      ["gamma-cas", "ruchbah"],
      ["ruchbah", "segin"]
    ],
    ra: 15.0,
    dec: 60.0
  },
  {
    id: "Sco",
    name: "Scorpius",
    meaning: "The Scorpion",
    mythology: "Scorpius represents the scorpion sent by Gaia to kill the boastful hunter Orion. The scorpion succeeded and both were placed in the sky as a reminder of the consequences of hubris. The bright red star Antares at its heart is often called the rival of Mars due to its color.",
    bestMonth: 7,
    hemisphere: "south",
    stars: ["antares", "shaula", "dschubba", "graffias", "sargas", "epsilon-sco", "kappa-sco", "pi-sco"],
    lines: [
      ["graffias", "dschubba"],
      ["dschubba", "pi-sco"],
      ["pi-sco", "antares"],
      ["antares", "epsilon-sco"],
      ["epsilon-sco", "mu-sco"],
      ["mu-sco", "zeta-sco"],
      ["zeta-sco", "eta-sco"],
      ["eta-sco", "sargas"],
      ["sargas", "kappa-sco"],
      ["kappa-sco", "iota-sco"],
      ["iota-sco", "shaula"]
    ],
    ra: 252.0,
    dec: -30.0
  },
  {
    id: "Leo",
    name: "Leo",
    meaning: "The Lion",
    mythology: "Leo represents the Nemean Lion, a monstrous beast with an impenetrable hide that terrorized the people of Nemea. Heracles slew the lion as the first of his twelve labors by strangling it. Zeus placed the lion among the stars to honor the great battle.",
    bestMonth: 4,
    hemisphere: "both",
    stars: ["regulus", "denebola", "algieba", "zosma", "chertan", "epsilon-leo", "mu-leo", "eta-leo"],
    lines: [
      ["regulus", "eta-leo"],
      ["eta-leo", "algieba"],
      ["algieba", "mu-leo"],
      ["mu-leo", "epsilon-leo"],
      ["epsilon-leo", "mu-leo"],
      ["algieba", "zosma"],
      ["zosma", "denebola"],
      ["zosma", "chertan"],
      ["chertan", "regulus"]
    ],
    ra: 160.0,
    dec: 15.0
  },
  {
    id: "Gem",
    name: "Gemini",
    meaning: "The Twins",
    mythology: "Gemini represents the twins Castor and Pollux. Castor was mortal and Pollux was divine, sons of Leda. When Castor was killed, Pollux begged Zeus to let him share his immortality with his brother. Zeus placed them together in the sky where they would never be separated.",
    bestMonth: 2,
    hemisphere: "north",
    stars: ["castor", "pollux", "alhena", "mu-gem", "epsilon-gem", "delta-gem", "kappa-gem"],
    lines: [
      ["castor", "pollux"],
      ["castor", "mu-gem"],
      ["mu-gem", "epsilon-gem"],
      ["epsilon-gem", "delta-gem"],
      ["delta-gem", "kappa-gem"],
      ["pollux", "kappa-gem"],
      ["alhena", "delta-gem"]
    ],
    ra: 110.0,
    dec: 25.0
  },
  {
    id: "Tau",
    name: "Taurus",
    meaning: "The Bull",
    mythology: "Taurus represents the white bull form taken by Zeus to abduct Europa, a Phoenician princess. He swam across the sea to Crete with her on his back. The bright red eye of the bull is the star Aldebaran, and the Pleiades star cluster rides on the bull's shoulder.",
    bestMonth: 1,
    hemisphere: "north",
    stars: ["aldebaran", "elnath", "eta-tau", "zeta-tau", "lambda-tau"],
    lines: [
      ["aldebaran", "elnath"],
      ["aldebaran", "zeta-tau"],
      ["aldebaran", "lambda-tau"],
      ["aldebaran", "eta-tau"]
    ],
    ra: 65.0,
    dec: 18.0
  },
  {
    id: "CMa",
    name: "Canis Major",
    meaning: "The Great Dog",
    mythology: "Canis Major is one of Orion's hunting dogs, faithfully following the hunter across the sky. It contains Sirius, the brightest star in the night sky, known as the Dog Star. The ancient Egyptians used the heliacal rising of Sirius to predict the annual flooding of the Nile.",
    bestMonth: 2,
    hemisphere: "south",
    stars: ["sirius", "adhara", "wezen", "mirzam", "aludra", "furud"],
    lines: [
      ["sirius", "mirzam"],
      ["sirius", "adhara"],
      ["sirius", "wezen"],
      ["wezen", "adhara"],
      ["wezen", "aludra"],
      ["sirius", "furud"]
    ],
    ra: 105.0,
    dec: -22.0
  },
  {
    id: "CMi",
    name: "Canis Minor",
    meaning: "The Little Dog",
    mythology: "Canis Minor is Orion's smaller hunting dog. In one version of the myth it represents Maera, the faithful dog of Icarius who led his daughter Erigone to her father's grave. The constellation's brightest star, Procyon, means 'before the dog' as it rises just before Sirius.",
    bestMonth: 3,
    hemisphere: "both",
    stars: ["procyon"],
    lines: [],
    ra: 115.0,
    dec: 5.0
  },
  {
    id: "Aql",
    name: "Aquila",
    meaning: "The Eagle",
    mythology: "Aquila represents the eagle that carried Zeus's thunderbolts. In one story, it is the eagle sent by Zeus to carry the young Ganymede to Mount Olympus to serve as cupbearer to the gods. Altair, its brightest star, forms part of the Summer Triangle with Vega and Deneb.",
    bestMonth: 8,
    hemisphere: "both",
    stars: ["altair", "tarazed", "alshain", "delta-aql"],
    lines: [
      ["tarazed", "altair"],
      ["altair", "alshain"],
      ["altair", "delta-aql"]
    ],
    ra: 297.0,
    dec: 5.0
  },
  {
    id: "Lyr",
    name: "Lyra",
    meaning: "The Lyre",
    mythology: "Lyra represents the lyre of Orpheus, the legendary musician whose playing could charm all living things. After his death, Zeus placed the lyre in the sky. Its brightest star Vega is one of the brightest in the sky and was once the North Star around 12,000 BCE.",
    bestMonth: 8,
    hemisphere: "north",
    stars: ["vega", "sheliak", "sulafat"],
    lines: [
      ["vega", "sheliak"],
      ["vega", "sulafat"],
      ["sheliak", "sulafat"]
    ],
    ra: 282.0,
    dec: 35.0
  },
  {
    id: "Cyg",
    name: "Cygnus",
    meaning: "The Swan",
    mythology: "Cygnus represents Zeus disguised as a swan when he seduced Leda, or in another tale, the form taken by Orpheus after death so he could be placed next to his lyre. The constellation's cross shape has earned it the nickname the Northern Cross. Deneb, at the swan's tail, is one of the most luminous stars visible to the naked eye.",
    bestMonth: 9,
    hemisphere: "north",
    stars: ["deneb", "sadr", "gienah-cyg", "albireo", "delta-cyg"],
    lines: [
      ["deneb", "sadr"],
      ["sadr", "albireo"],
      ["sadr", "gienah-cyg"],
      ["sadr", "delta-cyg"]
    ],
    ra: 305.0,
    dec: 40.0
  },
  {
    id: "Sgr",
    name: "Sagittarius",
    meaning: "The Archer",
    mythology: "Sagittarius is often identified as the centaur Chiron, though some say it represents Crotus, son of Pan. The archer aims his bow at the heart of the scorpion, Antares. The center of our Milky Way galaxy lies in the direction of Sagittarius, making it rich in deep-sky objects.",
    bestMonth: 8,
    hemisphere: "south",
    stars: ["kaus-australis", "nunki", "kaus-media", "kaus-borealis", "ascella", "phi-sgr", "gamma-sgr"],
    lines: [
      ["kaus-australis", "kaus-media"],
      ["kaus-media", "kaus-borealis"],
      ["kaus-borealis", "phi-sgr"],
      ["phi-sgr", "nunki"],
      ["nunki", "ascella"],
      ["ascella", "kaus-australis"],
      ["kaus-media", "gamma-sgr"],
      ["phi-sgr", "ascella"]
    ],
    ra: 280.0,
    dec: -28.0
  },
  {
    id: "Vir",
    name: "Virgo",
    meaning: "The Maiden",
    mythology: "Virgo is often associated with Demeter, goddess of the harvest, or her daughter Persephone. When Persephone was taken to the underworld, Demeter's grief caused the earth to become barren, creating winter. Spica, the brightest star, represents an ear of wheat held by the maiden.",
    bestMonth: 5,
    hemisphere: "both",
    stars: ["spica", "zavijava", "porrima", "vindemiatrix", "eta-vir", "delta-vir"],
    lines: [
      ["vindemiatrix", "porrima"],
      ["porrima", "spica"],
      ["porrima", "delta-vir"],
      ["delta-vir", "eta-vir"],
      ["eta-vir", "zavijava"],
      ["zavijava", "porrima"]
    ],
    ra: 195.0,
    dec: -5.0
  },
  {
    id: "And",
    name: "Andromeda",
    meaning: "The Chained Princess",
    mythology: "Andromeda was the daughter of King Cepheus and Queen Cassiopeia. Her mother's boasting angered Poseidon, who demanded Andromeda be chained to a rock as sacrifice to a sea monster. She was rescued by Perseus, who turned the monster to stone with Medusa's head.",
    bestMonth: 11,
    hemisphere: "north",
    stars: ["alpheratz", "mirach", "almach", "delta-and"],
    lines: [
      ["alpheratz", "mirach"],
      ["mirach", "almach"],
      ["mirach", "delta-and"]
    ],
    ra: 20.0,
    dec: 35.0
  },
  {
    id: "Per",
    name: "Perseus",
    meaning: "The Hero",
    mythology: "Perseus was the legendary Greek hero who slew Medusa and rescued Andromeda from a sea monster. He used winged sandals from Hermes and a cap of invisibility from Hades. The star Algol, known as the Demon Star, represents Medusa's eye and is one of the best-known eclipsing binaries.",
    bestMonth: 12,
    hemisphere: "north",
    stars: ["mirfak", "algol"],
    lines: [
      ["mirfak", "algol"]
    ],
    ra: 50.0,
    dec: 45.0
  },
  {
    id: "Cen",
    name: "Centaurus",
    meaning: "The Centaur",
    mythology: "Centaurus represents Chiron, the wisest and most just of all centaurs. Unlike the wild centaurs, Chiron was civilized and a teacher of heroes including Achilles and Jason. He was accidentally wounded by one of Heracles' poisoned arrows and, being immortal, chose to give up his immortality to end his suffering.",
    bestMonth: 5,
    hemisphere: "south",
    stars: ["rigil-kentaurus", "hadar", "menkent", "muhlifain"],
    lines: [
      ["rigil-kentaurus", "hadar"],
      ["hadar", "muhlifain"],
      ["muhlifain", "menkent"]
    ],
    ra: 210.0,
    dec: -50.0
  },
  {
    id: "Cru",
    name: "Crux",
    meaning: "The Southern Cross",
    mythology: "Crux is the smallest constellation but one of the most distinctive in the southern sky. It was known to the ancient Greeks but was only defined as a separate constellation in the 16th century. It has been used for navigation in the southern hemisphere, pointing toward the south celestial pole.",
    bestMonth: 5,
    hemisphere: "south",
    stars: ["acrux", "mimosa", "gacrux", "delta-cru"],
    lines: [
      ["acrux", "gacrux"],
      ["mimosa", "delta-cru"]
    ],
    ra: 187.0,
    dec: -60.0
  },
  {
    id: "Peg",
    name: "Pegasus",
    meaning: "The Winged Horse",
    mythology: "Pegasus was a winged horse that sprang from the blood of Medusa when Perseus cut off her head. The hero Bellerophon tamed Pegasus with a golden bridle given by Athena and rode him to defeat the Chimera. The Great Square of Pegasus, formed by four bright stars, is one of the most recognizable asterisms in the autumn sky.",
    bestMonth: 10,
    hemisphere: "north",
    stars: ["markab", "scheat", "algenib", "enif"],
    lines: [
      ["markab", "scheat"],
      ["scheat", "alpheratz"],
      ["alpheratz", "algenib"],
      ["algenib", "markab"],
      ["markab", "enif"]
    ],
    ra: 340.0,
    dec: 18.0
  },
  {
    id: "Psc",
    name: "Pisces",
    meaning: "The Fish",
    mythology: "Pisces represents two fish tied together by a cord. In Greek mythology, Aphrodite and her son Eros transformed into fish to escape the monster Typhon. They tied themselves together so they would not lose each other in the Euphrates River.",
    bestMonth: 11,
    hemisphere: "north",
    stars: ["eta-psc", "gamma-psc", "omega-psc", "alpha-psc"],
    lines: [
      ["eta-psc", "alpha-psc"],
      ["alpha-psc", "omega-psc"],
      ["omega-psc", "gamma-psc"]
    ],
    ra: 10.0,
    dec: 10.0
  },
  {
    id: "Ari",
    name: "Aries",
    meaning: "The Ram",
    mythology: "Aries represents the golden-fleeced ram sent by Hermes to rescue Phrixus and Helle from their stepmother. The ram flew them across the sea, though Helle fell and drowned in what became the Hellespont. Phrixus sacrificed the ram and hung its golden fleece, which Jason and the Argonauts later sought.",
    bestMonth: 12,
    hemisphere: "north",
    stars: ["hamal", "sheratan", "mesarthim"],
    lines: [
      ["hamal", "sheratan"],
      ["sheratan", "mesarthim"]
    ],
    ra: 30.0,
    dec: 21.0
  },
  {
    id: "Cnc",
    name: "Cancer",
    meaning: "The Crab",
    mythology: "Cancer represents the giant crab Karkinos sent by Hera to distract Heracles during his battle with the Hydra. The crab pinched Heracles' foot but was crushed underfoot. Hera placed it in the sky as a reward for its service, though it was given only faint stars as a reminder of its failure.",
    bestMonth: 3,
    hemisphere: "north",
    stars: ["acubens", "altarf", "asellus-borealis", "asellus-australis", "iota-cnc"],
    lines: [
      ["acubens", "asellus-australis"],
      ["asellus-australis", "asellus-borealis"],
      ["asellus-australis", "altarf"],
      ["asellus-borealis", "iota-cnc"]
    ],
    ra: 130.0,
    dec: 15.0
  },
  {
    id: "Lib",
    name: "Libra",
    meaning: "The Scales",
    mythology: "Libra represents the scales of justice held by Astraea, the goddess of justice and innocence. The Romans saw this constellation as the claws of neighboring Scorpius before giving it its own identity. It is the only zodiac constellation that represents an inanimate object.",
    bestMonth: 6,
    hemisphere: "south",
    stars: ["zubenelgenubi", "zubeneschamali", "sigma-lib"],
    lines: [
      ["zubenelgenubi", "zubeneschamali"],
      ["zubenelgenubi", "sigma-lib"]
    ],
    ra: 228.0,
    dec: -15.0
  },
  {
    id: "Cap",
    name: "Capricornus",
    meaning: "The Sea Goat",
    mythology: "Capricornus represents the goat-fish hybrid form taken by Pan when he dove into the Nile to escape the monster Typhon. The lower half became a fish while the upper remained a goat. In Babylonian astronomy it was associated with Ea, the god of water and wisdom.",
    bestMonth: 9,
    hemisphere: "south",
    stars: ["deneb-algedi", "dabih", "algedi", "nashira", "omega-cap", "zeta-cap"],
    lines: [
      ["algedi", "dabih"],
      ["dabih", "omega-cap"],
      ["omega-cap", "zeta-cap"],
      ["zeta-cap", "nashira"],
      ["nashira", "deneb-algedi"],
      ["deneb-algedi", "algedi"]
    ],
    ra: 315.0,
    dec: -20.0
  },
  {
    id: "Aqr",
    name: "Aquarius",
    meaning: "The Water Bearer",
    mythology: "Aquarius represents Ganymede, the beautiful Trojan youth carried to Mount Olympus by Zeus's eagle to serve as cupbearer to the gods. He pours an endless stream of water from his urn. The ancient Babylonians associated this region of the sky with water, as the Sun passed through it during the rainy season.",
    bestMonth: 10,
    hemisphere: "both",
    stars: ["sadalsuud", "sadalmelik", "skat", "eta-aqr", "lambda-aqr"],
    lines: [
      ["sadalmelik", "sadalsuud"],
      ["sadalsuud", "eta-aqr"],
      ["eta-aqr", "lambda-aqr"],
      ["lambda-aqr", "skat"],
      ["skat", "sadalmelik"]
    ],
    ra: 335.0,
    dec: -10.0
  },
  {
    id: "Dra",
    name: "Draco",
    meaning: "The Dragon",
    mythology: "Draco represents Ladon, the hundred-headed dragon that guarded the golden apples in the Garden of the Hesperides. Heracles slew the dragon as one of his twelve labors. The star Thuban in Draco was the pole star around 2700 BCE when the Egyptian pyramids were being built.",
    bestMonth: 7,
    hemisphere: "north",
    stars: ["eltanin", "rastaban", "thuban", "eta-dra", "nodus-secundus"],
    lines: [
      ["eltanin", "rastaban"],
      ["rastaban", "nodus-secundus"],
      ["nodus-secundus", "eta-dra"],
      ["eta-dra", "thuban"]
    ],
    ra: 260.0,
    dec: 60.0
  },
  {
    id: "Boo",
    name: "Bootes",
    meaning: "The Herdsman",
    mythology: "Bootes is often identified as the ploughman who drives the Great Bear around the pole. Some say he represents Arcas, son of Zeus and Callisto, placed in the sky near his bear-mother. Others identify him as Icarius, who was given the secret of winemaking by Dionysus.",
    bestMonth: 6,
    hemisphere: "north",
    stars: ["arcturus", "izar", "muphrid", "seginus", "nekkar", "delta-boo", "rho-boo"],
    lines: [
      ["arcturus", "izar"],
      ["izar", "delta-boo"],
      ["delta-boo", "nekkar"],
      ["nekkar", "seginus"],
      ["seginus", "arcturus"],
      ["arcturus", "muphrid"],
      ["arcturus", "rho-boo"]
    ],
    ra: 220.0,
    dec: 30.0
  },
  {
    id: "CrB",
    name: "Corona Borealis",
    meaning: "The Northern Crown",
    mythology: "Corona Borealis represents the crown given by Dionysus to Ariadne, daughter of King Minos of Crete. After Theseus abandoned her on the island of Naxos, Dionysus fell in love with her and gave her a jeweled crown. When she died, Dionysus threw the crown into the sky where its gems became stars.",
    bestMonth: 7,
    hemisphere: "north",
    stars: ["alphecca", "nusakan", "gamma-crb", "delta-crb", "epsilon-crb", "theta-crb"],
    lines: [
      ["theta-crb", "nusakan"],
      ["nusakan", "alphecca"],
      ["alphecca", "gamma-crb"],
      ["gamma-crb", "delta-crb"],
      ["delta-crb", "epsilon-crb"]
    ],
    ra: 234.0,
    dec: 28.0
  },
  {
    id: "Crv",
    name: "Corvus",
    meaning: "The Crow",
    mythology: "Corvus represents Apollo's sacred crow. Apollo sent the crow to fetch water in a cup, but the bird waited by a fig tree for the fruit to ripen and returned late. As an excuse it brought back a water snake, claiming the serpent had blocked the spring. Apollo saw through the lie and placed all three in the sky.",
    bestMonth: 5,
    hemisphere: "south",
    stars: ["gienah-crv", "kraz", "algorab", "minkar"],
    lines: [
      ["gienah-crv", "algorab"],
      ["algorab", "minkar"],
      ["minkar", "kraz"],
      ["kraz", "gienah-crv"]
    ],
    ra: 185.0,
    dec: -20.0
  }
];
