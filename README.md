
# EESTech Challenge 2024 
## Uvod

Kroz širu javnost se provukla misao kako je AI došao na nivo da nas navodno zameni iako stručnjaci oduvek govore "Korak ispred konkurencije neće biti onaj koji ima najnoviju tehnologiju već onaj koji zna postojeću da iskoristi na najbolji način".

Računarska revolucija nas je dovela da danas živimo u svetu LLM-ova (eng. Large Language Model). Najpoznatiji ChatGPT nam je olakšao monotone poslove, definitivno pomogao u studiranju, nekome i na ispitu… ali složićemo se da pun potencijal LLM-ova kao alata za studiranje, još nije oktljučan. 

## Zadatak
Formirati program koji bi pomogao u obrazovanju korišćenjem open-source LLM-a. Dozvoljeno je korišćenje svih resursa dostupnih putem interneta u svrhu istraživanja. Za izradu rešenja koristite programski jezik i tehnologiju po želji.

## Ideja
Napraviti softver koji je namenjen individualnim korisnicima, u vidu plaćenog pristupa ili besplatnog sa ograničenjima, i organizacijama. Prilikom pravljenja individualnog naloga korisnik može da izabere stepen trenutnog obrazovanja koje pohadja. Nakon toga će imati ponuđene predmete
za svoje obrazovanje gde može da polaže testove i da dobija feedback.

## Implementacija

Tech stek koji je koriscen je Angular 21, Flask micro web frame work, kontejnerizovani mongoDb i Llama3_8B. 

### Llama3 funkcije:
Za plaćeni nalog: 
1. Dobavi pitanje za test određenog tipa
2. Proveri tačnost odgovora
3. Generiši izveštaj o testu
4. Na osnovu prethodnih testova, daj izveštaj korisniku šta su mu prednosti/mane 

Za besplatni pristup:
1. Postavi mi N pitanja na datu temu i proveri odgovore
2. Odgovori mi na nekoliko pitanja koja ti postavim
 

