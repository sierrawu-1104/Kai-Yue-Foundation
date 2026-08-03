/* Central EN / Traditional Chinese dictionary for the whole site.
   Loaded before script.js on every page; script.js's lang-toggle IIFE reads
   from window.KY_I18N via dotted key paths (e.g. "nav.events"). */
window.KY_I18N = {
  nav: {
    events: { en: "Events", zh: "活動" },
    partnerships: { en: "Partnerships", zh: "合作夥伴" },
    gallery: { en: "Gallery", zh: "畫廊" },
    contact: { en: "Contact Us", zh: "聯絡我們" },
  },

  footer: {
    copyright: { en: "© Kai Yue Foundation. All rights reserved.", zh: "© 愷悅基金會 版權所有" },
  },

  index: {
    heroLine1: { en: "Advancing Education.", zh: "推動教育。" },
    heroLine2: { en: "Elevating Arts.", zh: "提升藝術。" },
    heroLine3: { en: "Enriching Community.", zh: "豐富社區。" },
    missionEyebrow: { en: "OUR MISSION", zh: "我們的使命" },
    missionText: {
      en: "The KAI YUE FOUNDATION Corporation is a non-profit private foundation (501 (c) 3 tax exempt) established by the Jim Huang Family. The foundation is dedicated to advancing charitable and educational initiatives that strengthen and uplift the communities where we live and work. By investing the foundation's resources, we can foster lasting relationships in our communities and promote culture developments.",
      zh: "愷悅基金會（KAI YUE FOUNDATION）是由黃吉姆（Jim Huang）家族創立的非營利私人基金會（享有501(c)3免稅資格）。本基金會致力於推動慈善與教育事業，強化並提升我們生活與工作所在的社區。透過投入基金會資源，我們得以在社區中建立長久的情誼，並促進文化的發展。",
    },
    missionCta: { en: "See Our Events", zh: "查看我們的活動" },
    pillarsHeading: { en: "Ways We Give Back", zh: "我們回饋社會的方式" },
    pillarChineseLabel: { en: "Chinese Communities", zh: "華人社區" },
    pillarChineseText: {
      en: "Strengthen and celebrate the Chinese community by supporting education programs, cultural concerts and events, and charitable organizations with shared missions.",
      zh: "透過支持教育計畫、文化音樂會與活動，以及理念相近的慈善組織，強化並頌揚華人社區。",
    },
    pillarArtsLabel: { en: "Performing Arts", zh: "表演藝術" },
    pillarArtsText: {
      en: "Support and elevate the arts through meaningful sponsorships in cultural programming, including music festivals, live performances, orchestras, chamber music, and other artistic initiatives that inspire creativity and enrich the community.",
      zh: "透過贊助深具意義的文化節目，包括音樂節、現場演出、管弦樂團、室內樂及其他藝術活動，支持並提升藝術水平，激發創造力並豐富社區生活。",
    },
    pillarEducationLabel: { en: "Education", zh: "教育" },
    pillarEducationText: {
      en: "Provide scholarships to students with demonstrated financial need who have been accepted to or are currently enrolled in accredited educational programs, helping expand access to education and opportunity.",
      zh: "為經濟確有需要、已獲錄取或正就讀於認可教育機構的學生提供獎學金，協助擴大教育與機會的取得管道。",
    },
    pillarPhysicsLabel: { en: "Physics", zh: "物理學" },
    pillarPhysicsText: {
      en: "Provide grants and awards to qualified institutions and individuals to support and advance the physical sciences, with fellowship opportunities available in areas such as research, education, and academic development.",
      zh: "為合格機構與個人提供獎助金與獎項，支持並推動物理科學的發展，並於研究、教育及學術發展等領域提供獎學金機會。",
    },
  },

  events: {
    heroTitle: { en: "EVENTS", zh: "活動" },
    heroSubtitle: {
      en: "A look back at the concerts, galas, and community celebrations the Kai Yue Foundation has been proud to sponsor.",
      zh: "回顧愷悅基金會引以為傲、曾贊助支持的音樂會、晚宴與社區慶祝活動。",
    },
    timelineLabel: { en: "Timeline", zh: "時間軸" },

    e2026Title: { en: "Salute to Vienna New Year's Concert", zh: "《向維也納致敬》新年音樂會" },
    e2026Text: {
      en: "Every New Year, the KAI YUE FOUNDATION sponsors the Salute to Vienna New Year's Concert, which celebrates the richly festive, romantic and soul-stirring music of Johann Strauss, Jr. with a selection of soaring overtures, arias and duets that capture the essence of Vienna's Golden Age, including the Blue Danube Waltz. The concert features Europe's finest singers, internationally acclaimed dancers and a full orchestra.",
      zh: "每年新年期間，愷悅基金會都會贊助《向維也納致敬》新年音樂會，透過一系列氣勢磅礴的序曲、詠嘆調與二重唱，包括著名的《藍色多瑙河圓舞曲》，展現小約翰．史特勞斯（Johann Strauss, Jr.）音樂中歡慶、浪漫且動人心弦的風采，重現維也納黃金時代的精髓。音樂會由歐洲頂尖歌唱家、享譽國際的舞者及完整管弦樂團共同演出。",
    },

    e2025aTitle: { en: "Lea Salonga at the Kravis Center", zh: "Lea Salonga 於柯維斯中心演出" },
    e2025aText: {
      en: "The KAI YUE FOUNDATION sponsored Lea Salonga's debut at the Kravis Center. The concert included stage and screen classics from Lea's iconic roles including songs from Miss Saigon, Les Misérables, Aladdin and Mulan, new-found favorites from the critically acclaimed Broadway and West End hit Old Friends, Broadway blockbusters, pop classics and much more from her celebrated career and beyond.",
      zh: "愷悅基金會贊助了Lea Salonga在柯維斯中心的首次演出。音樂會涵蓋Lea多個經典舞台與影視角色的歌曲，包括《西貢小姐》（Miss Saigon）、《悲慘世界》（Les Misérables）、《阿拉丁》（Aladdin）與《花木蘭》（Mulan），以及廣受好評的百老匯與倫敦西區熱門劇作《老朋友》（Old Friends）中的新曲，還有百老匯經典名曲、流行金曲，以及她輝煌演藝生涯中的更多精彩曲目。",
    },

    e2025bTitle: { en: "Sound of Harvest 2025:<br> A Season in Harmony", zh: "豐收之聲 2025：<br>和諧的季節" },
    e2025bText: {
      en: "The Chinese Musician Association brought together the community through an inspiring celebration of music, culture, and the arts. Kai Yue Foundation was proud to serve as one of the event's sponsors, supporting its mission to enrich lives through artistic expression and meaningful community engagement.",
      zh: "美洲中國音樂家協會透過一場鼓舞人心的音樂、文化與藝術慶典，將社區凝聚在一起。愷悅基金會很榮幸能成為此次活動的贊助者之一，支持其透過藝術表達與深具意義的社區參與來豐富生活的使命。",
    },

    e2024Title: { en: "Vienna Philharmonic at Kravis", zh: "維也納愛樂於柯維斯中心演出" },
    e2024Text: {
      en: "The Vienna Philharmonic makes their long overdue Kravis Center debut. Widely considered the finest and most important orchestra in the world, Vienna Philharmonic will be joined by guest conductor Franz Welser-Möst. The Kai Yue Foundation was one of the sponsors for the Vienna Philharmonic's performance of Alban Berg's Three Pieces for Orchestra and Mahler's epic 9th Symphony.",
      zh: "維也納愛樂樂團終於首度登台柯維斯中心，此樂團普遍被譽為世界上最傑出、最重要的管弦樂團之一，並由客席指揮法蘭茲．威爾瑟－莫斯特（Franz Welser-Möst）共同演出。愷悅基金會是維也納愛樂此次演出的贊助者之一，曲目包括阿爾班．貝爾格（Alban Berg）的《管弦樂三首》以及馬勒氣勢恢宏的第九號交響曲。",
    },

    e2023Title: { en: "Cleveland Orchestra at Kravis", zh: "克里夫蘭管弦樂團於柯維斯中心演出" },
    e2023Text: {
      en: "The Cleveland Orchestra under Music Director Franz Welser-Möst was recently called \"virtually flawless\" by the New York Times. Hailed as one of the very best orchestras on the planet, noted for its musical excellence and for its devotion and service to the community it calls home. The Kai Yue Foundation was one of the sponsors for the Cleveland Orchestra's performance of Schubert, Symphony No. 8 \"Unfinished\" and Tchaikovsky, Symphony No.6 \"Pathetique\".",
      zh: "由音樂總監法蘭茲．威爾瑟－莫斯特（Franz Welser-Möst）領軍的克里夫蘭管弦樂團，近日被《紐約時報》譽為「近乎完美」。該樂團被公認為全球頂尖樂團之一，以卓越的音樂造詣及對所在社區的奉獻與服務聞名。愷悅基金會是克里夫蘭管弦樂團演出舒伯特（Schubert）第八號交響曲《未完成》及柴可夫斯基（Tchaikovsky）第六號交響曲《悲愴》的贊助者之一。",
    },

    e2019Title: { en: "Blending of East and West:<br> Bravura Philharmonic Concert", zh: "東西交融：<br>博維拉愛樂音樂會" },
    e2019Text: {
      en: "The KAI YUE FOUNDATION sponsored the \"Blending of East and West\" concert conducted by Chiu-Tze Lin, pairing Western orchestral instrumentation with celebrated Chinese guest artists. This collaboration allows symphonic masterpieces to share the stage with traditional Eastern sounds, bridging cultural divides and expanding the musical repertoire.",
      zh: "愷悅基金會贊助了由林秋孜（Chiu-Tze Lin）指揮的《東西交融》音樂會，將西方管弦樂編制與知名華人客席藝術家相結合。這次合作讓交響樂經典名作與傳統東方樂音同台演出，跨越文化藩籬，拓展音樂的表現形式。",
    },

    e2016aTitle: { en: "Lu Siqing Violin Solo Concert", zh: "呂思清小提琴獨奏音樂會" },
    e2016aText: {
      en: "On the evening of July 30, 2016, at 7:30 PM, the Kai Yue Foundation proudly presented a solo concert by internationally renowned violinist Lu Siqing. The performance was held at Richardson Auditorium at Princeton University, drawing an audience of approximately 700.",
      zh: "2016年7月30日晚7：30，愷悅基金隆重推出享譽世界的小提琴演奏家呂思清的獨奏音樂會。演出在普林斯頓大學Richardson音樂廳舉行，大約700人觀看了演出。",
    },

    e2016bTitle: { en: "McCarter Theatre Gala Benefit", zh: "麥卡特劇院慈善晚宴" },
    e2016bText: {
      en: "Taking place on Saturday, May 7, 2016, the McCarter Theater Gala benefit began with cocktails, dinner, and live and silent auctions on McCarter's back lawn, tented and magically transformed for a wonderful evening. Following dinner, the Gala featured a performance by Lang Lang. KAI YUE FOUNDATION was a part of the organizing committee. The Gala raised over $140,000 for McCarter Theater.",
      zh: "2016年5月7日（星期六）舉行的麥卡特劇院慈善晚宴，以雞尾酒會、晚宴，以及在麥卡特後草坪舉行的現場與無聲拍賣揭開序幕，草坪搭起帳篷，化身為一場美妙夜晚的絕佳場地。晚宴後，郎朗（Lang Lang）帶來精彩演出。愷悅基金會是本次晚宴籌辦委員會的成員之一。本次晚宴共為麥卡特劇院籌得超過14萬美元善款。",
    },

    e2015Title: { en: "Journey of Love", zh: "愛的旅程" },
    e2015Text: {
      en: "The large-scale musical gala \"Journey of Love\" was proudly staged on May 23, 2015, at the New Jersey State Theatre. Hosted by the Kai Yue Foundation and supported jointly by numerous sponsors, volunteers, and community organizations, this charity gala drew an audience of approximately 1,400. The star-studded cast featured Cheng Lin, Zhang Aoyue, KC Porter, Zhou Lingyan, Liu Mo, Pang Xuan, the Curtis Trio, New York street dance troupes, and local arts organizations. Proceeds from the evening were donated to the charity \"Mama's Association\" to help support children in need.",
      zh: "【愛的旅程】大型歌舞晚會於2015年5月23日在新澤西州立大劇院隆重上演。這是由愷悅基金主辦，許多贊助者、志願者及社團聯合支持的一台公益晚會，大約有1400人觀看了演出。演員陣容強大，明星匯集。有程琳、張傲月、KC Porter、周靈燕、劉沫、龐旋、柯蒂斯三重奏、紐約街舞及當地藝術團體等出演。晚會盈利捐贈給了慈善組織《媽媽聯誼會》救助貧困兒童。",
    },

    e2014aTitle: { en: "The Old Man Lost His Horse", zh: "塞翁失馬" },
    e2014aText: {
      en: "The large-scale musical epic \"The Old Man Lost His Horse\" premiered on June 6, 2014, at Richardson Auditorium at Princeton University. Conceived and sponsored by the Kai Yue Foundation, this original musical epic was composed and performed by the Tim Keyes Consort, retelling an ancient Chinese fable through modern Western orchestral music, chorus, and solo performance. This was its world premiere.",
      zh: "[塞翁失馬]大型音樂史詩於2014年6月6日在普林斯頓大學Richardson音樂廳隆重上演。這是由愷悅基金創意並贊助，由Tim Keyes樂團創作並演奏的獨創音樂史詩。由西方現代管弦樂、合唱及獨奏演繹一個古老的中國寓言故事。世界首演。",
    },

    e2014bTitle: { en: "Li Chuanyun Violin Concerto Concert", zh: "李傳韻小提琴協奏音樂會" },
    e2014bText: {
      en: "Generously sponsored by the Kai Yue Foundation, the Ba-Lu-Hua Philharmonic Orchestra presented a musical extravaganza on Saturday, March 22, 2014, at 7:30 PM. Conducted by Music Director Lin Qiaoci, the concert featured internationally renowned violinist Li Chuanyun performing Tchaikovsky's Violin Concerto alongside \"Morning in the Miao Mountains\" and other pieces. Li Chuanyun's masterful technique and improvisational skill astonished the audience of over 700.",
      zh: "由愷悅基金會傾情捐助呈獻，巴露華愛樂交響樂團於2014年3月22日星期六晚7：30隆重推出了一場音樂盛會。這場音樂會由音樂總監林巧慈指揮，特邀世界著名的小提琴家李傳韻聯合出演了柴可夫斯基小提琴協奏曲以及苗嶺的早晨等曲目。李傳韻以精湛的演奏技巧和即興發揮技能而震驚在場的700多名觀眾。",
    },

    e2014cTitle: { en: "Plainsboro Chinese New Year Gala", zh: "普蘭斯堡中文學校春節晚會" },
    e2014cText: {
      en: "Sponsored by the Kai Yue Foundation, the Plainsboro Chinese School's Chinese New Year Gala \"Ten Thousand Galloping Horses\" was held on the evening of February 3, 2014, at McCarter Theatre.<br> <br>Co-sponsored by the Kai Yue Foundation and hosted by the Plainsboro Chinese School, the Chinese New Year Gala \"Dancing Golden Snake\" was held on the evening of February 10, 2013, at Plainsboro High School.",
      zh: "愷悅基金會贊助的普蘭斯堡中文學校【萬馬奔騰】春節晚會於2014年2月3日晚在麥卡特劇場舉行。<br> <br>由愷悅基金會協辦，普蘭斯堡中文學校主辦，【金蛇狂舞】春節晚會於2013年2月10日晚在普蘭斯堡高中舉行。",
    },
  },

  gallery: {
    viewToggleAll: { en: "See All Photos", zh: "查看全部照片" },
    viewToggleFeatured: { en: "See Featured Photos", zh: "查看精選照片" },
    featuredLabel: { en: "FEATURED: Lea Salonga", zh: "精選：Lea Salonga" },
    placeholderText: { en: "More photos coming soon.", zh: "更多照片即將推出。" },
    prevPhoto: { en: "Previous photo", zh: "上一張照片" },
    nextPhoto: { en: "Next photo", zh: "下一張照片" },
    prevColumn: { en: "Previous column", zh: "上一欄" },
    nextColumn: { en: "Next column", zh: "下一欄" },
    eventJourneyOfLove: { en: "Journey of Love Gala", zh: "愛的旅程晚會" },
    eventMcCarterGala: { en: "McCarter Theatre Gala", zh: "麥卡特劇院晚宴" },
    eventLuSiqing: { en: "Lu Siqing Violin Solo Concert", zh: "呂思清小提琴獨奏音樂會" },
    eventBlendingEastWest: { en: "Blending of East and West Concert", zh: "東西交融音樂會" },
    eventLiChuanyun: { en: "Li Chuanyun Violin Concerto Concert", zh: "李傳韻小提琴協奏音樂會" },
    eventPlainsboroGala: { en: "Plainsboro Chinese New Year Gala", zh: "普蘭斯堡中文學校春節晚會" },
    eventLeaSalonga: { en: "Lea Salonga", zh: "Lea Salonga" },
  },

  partnerships: {
    heroTitle: { en: "PARTNERSHIPS", zh: "合作夥伴" },
    heroSubtitle: {
      en: "We passionately support organizations where our funding makes the greatest impact.",
      zh: "我們全力支持能讓善款發揮最大影響力的機構。",
    },
    venuesHeading: { en: "Venues", zh: "場地" },
    organizationsHeading: { en: "Organizations", zh: "機構組織" },
    educationHeading: { en: "Education", zh: "教育機構" },

    carnegieName: { en: "Carnegie Hall", zh: "卡內基音樂廳" },
    carnegieLocation: { en: "New York, NY", zh: "紐約州紐約市" },
    carnegieText: {
      en: "Carnegie Hall is a concert venue in Midtown Manhattan in New York City, United States, located at 881 Seventh Avenue, occupying the east stretch of Seventh Avenue between West 56th Street and West 57th Street, two blocks south of Central Park. Carnegie Hall's mission is to present extraordinary music and musicians on the three stages of this legendary hall, to bring the transformative power of music to the widest possible audience, to provide visionary education programs, and to foster the future of music through the cultivation of new works, artists and audiences.",
      zh: "卡內基音樂廳是位於美國紐約市曼哈頓中城的音樂會場地，坐落於第七大道881號，介於西56街與西57街之間，距離中央公園以南僅兩個街區。卡內基音樂廳的使命，是在這座傳奇音樂廳的三個舞台上呈現非凡的音樂與音樂家，將音樂的變革力量帶給盡可能廣泛的觀眾，提供具遠見的教育課程，並透過培育新作品、新藝術家與新觀眾，開創音樂的未來。",
    },

    kravisName: { en: "Kravis Center for the Performing Arts", zh: "柯維斯表演藝術中心" },
    kravisLocation: { en: "West Palm Beach, FL", zh: "佛羅里達州西棕櫚灘" },
    kravisText: {
      en: "The Raymond F. Kravis Center for the Performing Arts, located in the heart of downtown West Palm Beach, Florida, is one of South Florida's leading cultural landmarks and premier destinations for world-class entertainment. Across its distinguished venues, the Kravis Center presents an exceptional range of programming, including acclaimed Broadway productions, classical concerts, comedy performances, cultural events, and impactful arts education initiatives.",
      zh: "雷蒙德．F．柯維斯表演藝術中心位於佛羅里達州西棕櫚灘市中心核心地帶，是南佛羅里達首屈一指的文化地標，也是世界級娛樂演出的首選之地。柯維斯中心旗下各具特色的場館，呈現內容豐富多元的節目，包括備受讚譽的百老匯製作、古典音樂會、喜劇表演、文化活動，以及深具影響力的藝術教育計畫。",
    },

    mccarterName: { en: "McCarter Theatre", zh: "麥卡特劇院" },
    mccarterLocation: { en: "Princeton, NJ", zh: "紐澤西州普林斯頓" },
    mccarterText: {
      en: "McCarter Theater Center for the Performing Arts in Princeton is one of the most active cultural centers in the nation, offering over 200 performances of theater, dance, music and special events each year. McCarter's audience is truly a regional one. Over 200,000 people come to McCarter each season from all twenty-one counties in New Jersey as well as Pennsylvania, New York and twenty-three additional states.",
      zh: "位於普林斯頓的麥卡特表演藝術劇院中心，是全美最活躍的文化中心之一，每年舉辦超過200場戲劇、舞蹈、音樂及特別活動演出。麥卡特的觀眾群遍及整個地區，每季有超過20萬人次前來觀賞演出，觀眾來自紐澤西州全部21個郡，以及賓夕法尼亞州、紐約州和另外23個州。",
    },

    timKeyesName: { en: "Tim Keyes Consort", zh: "提姆．凱伊斯合奏團" },
    timKeyesLocation: { en: "Plainfield, NJ", zh: "紐澤西州普蘭菲爾德" },
    timKeyesText: {
      en: "Tim Keyes Consort is a New Jersey Non-Profit 501(c)3 Corporation organized solely for charitable, educational, cultural and literary purposes. Tim Keyes continuously seeks out gifted and like-minded individuals to perform new and standard choral and orchestral repertoire. A pursuit of excellence drives every aspect of the Consort. From organization, to programming, to performance, Tim Keyes expects the best from his musicians and support staff.",
      zh: "提姆．凱伊斯合奏團是一個紐澤西州的501(c)3非營利機構，成立宗旨純為慈善、教育、文化與文學目的。提姆．凱伊斯持續尋覓才華洋溢、理念相近的音樂家，演出全新創作與經典的合唱及管弦樂曲目。對卓越的追求貫穿合奏團的每個面向，從組織架構、節目規劃到現場演出，提姆．凱伊斯對旗下音樂家與支援團隊皆要求最高水準。",
    },

    pkuName: { en: "Peking University Alumni Association", zh: "北京大學校友會" },
    pkuLocation: { en: "New York, NY", zh: "紐約州紐約市" },
    pkuText: {
      en: "PKUAA is a 501c3 not-for-profit organization registered in the State of New York serving Peking University (PKU) alumni in the Greater New York area. Its mission is to protect and promote the welfare of alumni; to help advance the personal and professional development of alumni; to facilitate and foster their communication and connection with each other and with Alma Mater; to help support the advancement of Alma Mater; and to serve as a platform of information exchange, mutual understanding and collaboration between Alma Mater and other organizations, and between China and U.S.",
      zh: "北京大學校友會（PKUAA）是一個在紐約州註冊的501(c)3非營利組織，服務大紐約地區的北京大學校友。其使命為維護並促進校友福祉；協助推動校友的個人與專業發展；促進並增進校友彼此之間，以及與母校之間的溝通與聯繫；協助支持母校的發展；並作為母校與其他機構之間，以及中美之間資訊交流、相互理解與合作的平台。",
    },

    aawmaName: { en: "American Alliance for World Music and Arts", zh: "美洲世界音樂藝術聯盟" },
    aawmaLocation: { en: "Princeton, NJ", zh: "紐澤西州普林斯頓" },
    aawmaText1: {
      en: "American Alliance for World Music and Arts is a non-profit organization dedicated to broaden the rich melodies and diverse repertories of Chinese music through innovative programs and to encourage cross-art form collaborations. The Alliance facilitates the creation, performance, teaching, and administration of culturally diverse world music and encourages communication within and outside of the world music field. AAWMA is home to music virtuosos, artists, educators, as well as talented youths and groups that introduce Chinese music to the American community in every style and method imaginable.",
      zh: "美洲世界音樂藝術聯盟（AAWMA）是一個非營利組織，致力於透過創新節目拓展中國音樂豐富的旋律與多元曲目，並鼓勵跨藝術形式的合作。聯盟致力促進多元文化世界音樂的創作、演出、教學與行政工作，並鼓勵世界音樂領域內外的交流。AAWMA匯聚了音樂大師、藝術家、教育工作者，以及才華洋溢的青年與團體，以各種可能的風格與方式，向美國社會引介中國音樂。",
    },
    aawmaText2: {
      en: "AAWMA's educational program has a tradition of bringing masters in and promoting and presenting tomorrow's emerging talents. In 2010 and 2012, AAWMA successfully hosted two International Chinese Music Festivals in China National Orchestra (in Beijing) and Princeton University in 2012, which were also co-hosted by the China National Orchestra and Princeton University Chinese Music Ensemble. These programs are not only delightful for the community members, but also help to discover the next generation of talented classical musicians with the ability to blend Western and Chinese music.",
      zh: "AAWMA的教育計畫向來致力於邀請音樂大師蒞臨，並推廣、呈現未來的新興人才。2010年及2012年，AAWMA成功舉辦了兩屆國際中國音樂節，分別於中國國家交響樂團（北京）及2012年普林斯頓大學舉行，並由中國國家交響樂團與普林斯頓大學中樂團共同協辦。這些節目不僅為社區成員帶來喜悅，也協助發掘下一代兼具中西音樂融合能力的優秀古典音樂家。",
    },

    mchfName: { en: "Montreal Chinese Hospital Foundation", zh: "蒙特婁華人醫院基金會" },
    mchfLocation: { en: "Montreal, Quebec", zh: "魁北克省蒙特婁" },
    mchfText1: {
      en: "The Montreal Chinese Hospital Foundation was established in 1972 for the purpose of receiving and maintaining funds in order to make gifts, grants, contributions and donations to the Montreal Chinese Hospital and other relative medical services beneficial to and required by the Chinese Community in Montreal, Province of Quebec.",
      zh: "蒙特婁華人醫院基金會成立於1972年，宗旨為接收並管理善款，以捐贈、資助及贊助蒙特婁華人醫院，以及魁北克省蒙特婁華人社區所需且受益的其他相關醫療服務。",
    },
    mchfText2: {
      en: "The collected funds are used at the Montreal Chinese Hospital to finance equipment and patient care services that are not covered under the budgets of the Quebec Department of Health and Social Services. Funds are also used to finance such other medical services, as the pre-natal care program, to the Montreal Chinese Community through the Montreal Chinese Hospital.",
      zh: "所募集的善款用於資助蒙特婁華人醫院添購未被魁北克省衛生及社會服務部預算涵蓋的設備與病患照護服務。善款亦透過蒙特婁華人醫院，資助如產前護理計畫等其他醫療服務，嘉惠蒙特婁華人社區。",
    },

    mcccaName: { en: "Montreal Center of Chinese Culture and Arts", zh: "蒙特婁中華文化藝術中心" },
    mcccaLocation: { en: "Montreal, Quebec", zh: "魁北克省蒙特婁" },
    mcccaText1: {
      en: "Founded in Montreal on August 11, 1996, the Montreal Center of Chinese Culture and Arts (MCCCA) is the first and largest organization of its kind in Greater Montreal. It consists of folk dances, folk music instrumental ensemble, vocal group, waist drums, lion dances, art school and cultural services.",
      zh: "蒙特婁中華文化藝術中心（MCCCA）於1996年8月11日在蒙特婁成立，是大蒙特婁地區同類組織中規模最大、成立最早的機構。中心下設民族舞蹈、民樂器樂團、聲樂組、腰鼓隊、舞獅隊、藝術學校及文化服務等單位。",
    },
    mcccaText2: {
      en: "It is composed of a sizable body of enthusiastic members who, apart from their other achievements in life, are diversified and versatile in artistic talents and performing skills. MCCCA has staged over hundreds of impressive performances to the Chinese, Canadian and American communities in and around Montreal, many other cities of Eastern Canada and US, on important social, cultural and other festive occasions.",
      zh: "中心由眾多熱心成員組成，他們在各自的人生成就之外，皆擁有多元且全面的藝術才華與表演技藝。MCCCA已在蒙特婁及周邊地區，以及加拿大東部與美國多個城市，於重要社交、文化及節慶場合，為華人、加拿大及美國社區呈現超過數百場精彩演出。",
    },

    bravuraName: { en: "Bravura Philharmonic Orchestra", zh: "博維拉愛樂樂團" },
    bravuraLocation: { en: "West Windsor, NJ", zh: "紐澤西州西溫莎" },
    bravuraText: {
      en: "This young orchestra was founded by and is under the direction of the internationally-renowned conductor and Steinway Artist Chiu-Tze Lin. It consists of professional musicians, gifted amateurs, and outstanding young music students. The orchestra, together with its ensembles, are available to provide musical services to the community. The Bravura Philharmonic Orchestra has four programs a year in its concert season: a Season-Opening Concert, a Holiday Concert in December, a Family Concert in March, and a Spring Concert in May. The orchestra also sponsors an annual Young Artists Competition, with the winners performing in concert with the orchestra in May.",
      zh: "這支年輕的樂團由國際知名指揮家暨史坦威藝術家林秋孜（Chiu-Tze Lin）創立並擔任指導。樂團成員包括專業音樂家、天賦出眾的業餘愛好者，以及優秀的青年音樂學生。樂團及其附屬合奏團體皆可為社區提供音樂服務。博維拉愛樂樂團每個音樂季推出四場節目：開季音樂會、12月的節慶音樂會、3月的家庭音樂會，以及5月的春季音樂會。樂團亦每年贊助青年藝術家大賽，優勝者將於5月與樂團同台演出。",
    },

    peddieName: { en: "Peddie School", zh: "佩迪學校" },
    peddieLocation: { en: "Hightstown, NJ", zh: "紐澤西州海茨敦" },
    peddieText: {
      en: "Guided by the confidence of our motto, \"We Finish Our Labors to Begin Them Anew,\" Peddie School is committed to the intellectual, social, and moral growth of each of our students. We welcome individuals with diverse talents and backgrounds whose excitement, curiosity and character create an educational community where passion for learning grows. In this boarding school environment we not only prepare our students for the rigors and rewards of college, but also inspire each to strive for the highest quality of citizenship.",
      zh: "秉持校訓「功成再啟」所展現的自信，佩迪學校致力於每位學生在智識、社交與品格上的成長。我們歡迎擁有多元才華與背景的學生，他們的熱情、好奇心與品格，共同塑造出充滿求知熱忱的教育社群。在這樣的寄宿學校環境中，我們不僅為學生做好迎接大學挑戰與回報的準備，更激勵每位學生追求最高品質的公民素養。",
    },

    princetonDayName: { en: "Princeton Day School", zh: "普林斯頓走讀學校" },
    princetonDayLocation: { en: "Princeton, NJ", zh: "紐澤西州普林斯頓" },
    princetonDayText: {
      en: "Princeton Day School nurtures the mind, the body, and the character of each student. In academics, athletics, the arts, and service, we celebrate the pursuit of individual excellence and the spirit of collaboration that binds us together as a community. We seek diversity of cultures, views, and talents to promote the intellectual growth and moral development of students. Integrity, respect, and compassion are essential to the school's mission. Our students leave Princeton Day School well equipped for college and beyond: prepared to act knowledgeably, to lead thoughtfully, to share generously, and to contribute meaningfully.",
      zh: "普林斯頓走讀學校致力培育每位學生的心智、體魄與品格。在學術、體育、藝術與服務等各領域，我們讚揚對個人卓越的追求，以及凝聚社群的合作精神。我們追求文化、觀點與才華的多元性，以促進學生的智識成長與品德發展。誠信、尊重與同理心是本校使命的核心。我們的學生離開普林斯頓走讀學校後，皆已充分準備好迎接大學及未來的挑戰：具備知識行事、審慎領導、慷慨分享及切實貢獻的能力。",
    },

    yinghuaName: { en: "YingHua Language School", zh: "應華語言學校" },
    yinghuaLocation: { en: "Lawrenceville, NJ", zh: "紐澤西州勞倫斯維爾" },
    yinghuaText: {
      en: "YingHua Language School is a non-profit organization located in Lawrenceville, New Jersey. Its founding principle is to build a language school that can commit to and focus on students' Chinese language education so that its graduates would truly gain solid language skills. Currently it is the only school in New Jersey that has fully adopted Dr. Liping Ma's \"Direct Character Recognition\" methodology, teaching modern simplified Chinese characters and introducing the Chinese phonetic system (PinYin) as a tool at the appropriate stage.",
      zh: "應華語言學校是一所位於紐澤西州勞倫斯維爾的非營利組織。其創校理念是建立一所專注投入學生中文教育的語言學校，讓畢業生真正掌握紮實的語言能力。目前，該校是紐澤西州唯一全面採用馬立平博士「漢字直接認讀」教學法的學校，教授現代簡體中文字，並在適當階段導入拼音系統作為輔助工具。",
    },

    huaxiaName: { en: "Huaxia Chinese School", zh: "華夏中文學校" },
    huaxiaLocation: { en: "Plainsboro, NJ", zh: "紐澤西州普蘭斯堡" },
    huaxiaText: {
      en: "Huaxia Chinese School is an independent, non-profit, non-religious, and non-political cultural education institution. Its purposes include teaching Chinese language and Chinese culture, and engaging in cultural-awareness activities in the community. The main Chinese language curriculum is offered from Kindergarten through ninth grade, alongside Advanced Chinese and Chinese as a Second Language (CSL) programs. Culture programs include Kungfu, Tai-chi, Fencing, Gymnastics, Badminton, Volleyball, Wei-qi (Go), Xiang-qi (Chinese Chess), Math, Traditional Chinese Musical Instruments, Drawing, and Crafts. The current enrollment of about 800 students is the largest in the Huaxia Chinese school system.",
      zh: "華夏中文學校是一所獨立、非營利、無宗教與政治色彩的文化教育機構，宗旨包括教授中文語言與中華文化，並於社區推展文化認識活動。主要中文課程涵蓋幼兒園至九年級，並設有中文進階班及中文作為第二語言（CSL）課程。文化課程包括功夫、太極、擊劍、體操、羽毛球、排球、圍棋、象棋、數學、中國傳統樂器、繪畫及手工藝。目前在校學生約800人，是華夏中文學校體系中規模最大的分校。",
    },
  },

  contact: {
    heroTitle: { en: "CONTACT US", zh: "聯絡我們" },
    heroSubtitle: {
      en: "We'd love to hear from you — reach out with questions, <br>donation inquiries, or partnership ideas.",
      zh: "我們期待聽到您的聲音——歡迎就任何問題、<br>捐款詢問或合作構想與我們聯繫。",
    },
    sendUsMessage: {
      en: "Send Us <br>A Message<span class=\"contact-accent-dot\"></span>",
      zh: "傳送<br>訊息給我們<span class=\"contact-accent-dot\"></span>",
    },
    contactInfoHeading: {
      en: "Contact <br>Info<span class=\"contact-accent-dot\"></span>",
      zh: "聯絡<br>資訊<span class=\"contact-accent-dot\"></span>",
    },
    namePlaceholder: { en: "Your full name*", zh: "您的全名*" },
    emailPlaceholder: { en: "Email address*", zh: "電子郵件地址*" },
    messagePlaceholder: { en: "Tell us about your inquiry or project idea!", zh: "請告訴我們您的詢問內容或提案構想！" },
    fileLabel: { en: "Attach Donation Application PDF (optional)", zh: "附上捐款申請PDF文件（選填）" },
    reachingOutAbout: { en: "I'm reaching<br>out about", zh: "我想諮詢<br>的主題是" },
    generalInquiry: { en: "General Inquiry", zh: "一般諮詢" },
    donationApplication: { en: "Donation Application", zh: "捐款申請" },
    sendButton: { en: "SEND TO US!", zh: "送出訊息！" },
    sendingButton: { en: "SENDING...", zh: "傳送中..." },
    statusSuccess: { en: "Thanks! Your message has been sent.", zh: "謝謝您！您的訊息已成功送出。" },
    statusError: {
      en: "Something went wrong. Please email us directly at huang@kyfoundation.org.",
      zh: "發生錯誤，請直接寄送電子郵件至 huang@kyfoundation.org。",
    },
    statusFileTooLarge: {
      en: "That PDF is too large (max 4MB). Please attach a smaller file.",
      zh: "此PDF檔案過大（上限為4MB），請附上較小的檔案。",
    },
    infoIntro: {
      en: "The Kai Yue Foundation supports music, education, and cultural exchange throughout our community.",
      zh: "愷悅基金會致力於支持整個社區的音樂、教育與文化交流。",
    },
    addressTitle: { en: "Plainsboro, NJ", zh: "紐澤西州普蘭斯堡" },
    addressText: {
      en: "Chair, Donations Committee<br>Kai Yue Foundation Corporation<br>101 Morgan Lane, Suite 202<br>Plainsboro, NJ 08536 USA",
      zh: "捐款委員會主席<br>愷悅基金會<br>101 Morgan Lane, Suite 202<br>Plainsboro, NJ 08536 USA",
    },
    infoNote: {
      en: "Donation requests are received in written physical OR PDF format and are by invitation only.",
      zh: "捐款申請僅接受書面實體或PDF格式，且僅限受邀者提出申請。",
    },
    eligibilityHeading: { en: "Eligibility", zh: "申請資格" },
    eligibility1: {
      en: "Application for donation is by invitation only. KAI YUE FOUNDATION does not accept non-solicited applications.",
      zh: "捐款申請僅限受邀者提出。愷悅基金會不接受未經邀請的申請。",
    },
    eligibility2: { en: "Typical donation amounts are from $500 to $20,000.", zh: "一般捐款金額介於500美元至20,000美元之間。" },
    eligibility3: {
      en: "Applicant must have a current and active registered charitable number (Canada) or 501(c)3 status (US).",
      zh: "申請機構須持有現行有效的慈善註冊編號（加拿大）或501(c)3免稅資格（美國）。",
    },
    eligibility4: {
      en: "Funds must be utilized in the states where organizations provide services.",
      zh: "款項須用於機構提供服務所在的州。",
    },
    eligibility5: {
      en: "Organizations must be applying for programs and services that fall in line with one of the foundation's areas of focus.",
      zh: "申請機構所提出的計畫與服務，須符合本基金會其中一項重點關注領域。",
    },
    eligibility6: {
      en: "Organizations must have strong fiscal management based on information gathered from the most recent copy of their financial statements.",
      zh: "申請機構須具備良好的財務管理能力，並以其最新財務報表為佐證。",
    },
    eligibility7: {
      en: "Organizations must have an operating Board of Directors and be able to illustrate the strength of their governance practices.",
      zh: "申請機構須設有運作中的董事會，並能展現其治理制度的健全性。",
    },
    eligibility8: {
      en: "Organizations must provide an annual progress report and feedback on how funds are used and the effectiveness of the program.",
      zh: "申請機構須提供年度進度報告，說明款項運用情形及計畫成效。",
    },
    eligibility9: { en: "Presentations and site visits may be required.", zh: "本基金會可能要求進行簡報說明及實地訪查。" },
    donationAppHeading: { en: "Donation Application", zh: "捐款申請" },
    downloadApplication: { en: "Download Application", zh: "下載申請表" },
  },
};
