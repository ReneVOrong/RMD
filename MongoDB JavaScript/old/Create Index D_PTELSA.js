/*----------------------------------------------
 Filename    :  Create Index D_PTELSA.js
 Author      :  Rene V Orong
 Date Written:  04 April 2018
 Abstract    :  Creates indexes.
           
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  04Apr2018  v1   1. Written 

 ----------------------------------------------*/

//use rochedc;

//-- dockey unique

  db.getCollection("D_PTELSA").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true });

//-- PTELSA Indexes/Indices

  db.getCollection("D_PTELSA").createIndex({ "Project": 1 });
  
  db.getCollection("D_PTELSA").createIndex({ "Task": 1 });
  
  db.getCollection("D_PTELSA").createIndex({ "Experiment": 1 });
  
  db.getCollection("D_PTELSA").createIndex({ "Lanename": 1 });
  
  db.getCollection("D_PTELSA").createIndex({ "Sample": 1 });
  
  db.getCollection("D_PTELSA").createIndex({ "Analysis": 1 });

  
//---- endScript