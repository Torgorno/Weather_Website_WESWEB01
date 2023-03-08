# Weather_Website_WESWEB01
This was a final project in the WESWEB01 course.The project’s goal is to show a random weather report when the user inputs a location. User can later bookmark their favorite locations and access them in their profile. Registration is not mandatory and anyone can search any location.

- The following is a Project report in Swedish. 
## Väder Webbsida.

### Dokumentation
#### Process
**Webbservern innehåller inga media filer, och använder sig inte av API:er eller tredjepartsbibliotek. Istället, använder Webbservern de inbyggda moduler ‘fs’, ‘QueryString’, samt ‘URL’ för att göra koden komplett. MongoDB används för att lagra användaruppgifter, såsom användarnamn, lösenord, samt favorit positioner. Webbservern lagrar också cookies, som sparar användarnamnet, när användaren registrerar sig, eller loggar in. Registrering var det svåraste i projektet i min åsikt, eftersom det var det första som behövde fixas, för att allt annat skulle fungera.**

**Webbservern har en weatherPage som visar ett slumpmässigt generad väderprognos. När användaren mattar in namnet på något plats, kommer det visa ett slumpmässig väderprognos för inmatade position. Prognosen är inte baserad på fakta.**

**När Webbservern registrerar användaren, skickas det till en profillista, var det kan se sin egen, samt andras profiler. Profiler har inga känsliga data som användarna kan se. Istället, visar det profilens användarnamn och deras favorit platser.Dessa favoritplatser använder sig av Querystring, och kan klickas på för att se väderprognos för positionen. Exempelvis Om användaren Sigge har favoritposition Tokyo i profilen, så går det att klicka på ordet Tokyo, för att se dess väderprognos.**

**När Webbservern autentiserar (loggar in) användaren, skickas användaren direkt till sin profil och inte till profillistan. Där kan användaren som har redan registrerad sig, snabbt kolla sina favoritpositioner. Profilen är samma som när man registrerar sig, skillnaden är att man loggar in istället.**

**Webbservern har en Homepage(Base) som användaren kommer in på i början, när webserver startas. Det används som en Welcome page och har inga andra funktioner.**

### Avvikelser:

**Mycket från projektet fick tas bort, eftersom det fanns tidsbrist och registrering och autentisering blev prioriterade istället.**

**WeatherPage skulle ha bilder och vindhastighet i väderprognosen, men jag hoppade över de, eftersom de var inte viktigaste delar av väderprognosen. Fortsättningsvis, fick jag skippa delen var man kan logga ut. Det skulle ta exponentiellt mycket mer tid, vilket jag hade inte mycket av, om jag skulle tillägga funktionen att göra sådant.
Jag fick också skippa ett viktigt del av säkerheten, som är kryptering av lösenord, på grund av samma ursäkt som innan, specifikt tidsbrist.**

### Utvärdering:

**Webbserver fick hoppa olika funktioner, eftersom tiden inte räckte, men i grunden fungerar webbservern som det ska. Routes och fileServer fungerar som det var tänkt från början och fungerar väl. Vidare, fungerar WeatherPage på ett godkänd nivå. Registreringen och autentiseringen fungerar fel fritt, men autentiseringen kunde förbättras. I sin helhet, uppfyller Webbserven syftet, som var att visa användaren väderprognos, och att kunna spara deras favorit positioner som bokmärke när registrerar.**

#### Testing
**Första problem var att när användaren registrerade sig och gick in i profilen, så vissades webbsidan utan att byta ut {{username}} och {{favpositions}}. Problemet var att URL:en var att det gick till /profiles.html, istället för bara /profiles. Förändringen hade inga negativa konskevenser och resultaten var att det kom fram till {{username}} och {{favpositions}} och byte ut de.**

**Vidare hade jag problem att när favorit position var sparad som strings istället för arrays. Detta betyder att varje bokstav för sig själv var randerad som en egen länk, istället för ordvis. Det var fixad genom att använda  split( , ) för att konvertera stringen till array. Förändringen hade inga negativa konskevenser och resultaten var att det kollade efter komma tecken i favPositions för att dela upp ord.**


### Vidareutveckling:
**Först och främst kan säkerheten utvecklas genom att kryptera lösenord när användarens data skickas in till databasen. Delvis säkerhetsaspekten kan förbättras.**

**Vidare, kan man lägga till att man använder cookies för att hålla in användaren inloggad, tills de själva väljer att logga ut, med knappen logout.  Man kan också ta bort profilelist för att slippa säkerhetsproblem, som till exempel att lokalisera användarens hemstad, eller då varande position.**

**Det Skulle vara lämpligt att förbättra WeatherPage genom att använda ett riktig API för att visa faktabaserad väderprognos, istället för slumpmässigt genererad prognos.**
