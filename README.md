Frontend
----
**vývoj**:  
`cd frontend`  
`npm run start`  

 **build pro produkci**  
 `cd frontend`  
 `npm run build` 
 
 **deploy**  
 `bash deploy.sh + jméno větve co se bude nasazovat`  
 pozor, lokální prostředí musí být na stejné větvi co se bude nasazovat aby se frontend vybuyldil ve stejné verzi
 
**styly**  
`css` nebo `sass` soubory se pomocí include připojí do libovolné třídy  

Docker
---
**pojmenování kontejnerů:**    
hlavní projekt je `pg` 
podprojekty jsou odděleny pomlčkou, např. pro `api` je název `pg-api`  
Název kontejneru s podprojektem je shodný s názvem podprojektu, např. `pg-api`  
Kontejner pro build má suffix `build`, např. `pg-api-build`  

Názvy kontejnerů: 
- pg-api 
- pg-api-build
- pg-frontend
- pg-frontend-build
 
  
