/*----------------------------------------------
 Filename    :  Create Indexes.js
 Author      :  Rene V Orong
 Date Written:  02 April 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                
                *MongoDB aggregate does not have a "toString" function, even in v3.6.
                *Will use $substr: to coerce conversion of numeric to string.
                
 Usage       :  1.  from the JavaScript file directory:  > mongo localhost:27017/rochedc "Aggregate dc - F_Analysis.js"
                2.            or, from the mongo shell:  > load("Aggregate dc - F_Analysis.js")        
                                
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  02Apr2018  v1   1. Written 

 ----------------------------------------------*/

 //-- PTELSA Indexes/Indices
 //--    dockey unique

  db.getCollection("D_PTELSA").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true });

  db.getCollection("D_PTELSA").createIndex({ "Project": 1 });
  db.getCollection("D_PTELSA").createIndex({ "Task": 1 });
  db.getCollection("D_PTELSA").createIndex({ "Experiment": 1 });
  db.getCollection("D_PTELSA").createIndex({ "Lane": 1 });
  db.getCollection("D_PTELSA").createIndex({ "Sample": 1 });
  db.getCollection("D_PTELSA").createIndex({ "Analysis": 1 });
 
 
  db.getCollection("F_Analysis").createIndex({ "dockey": 1 }, { "name": "dockey" })
  
  db.getCollection("F_Metrics").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true })
    
  db.getCollection("F_Manifest").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true })
  
  db.getCollection("F_Performance").createIndex({ "dockey": 1 }, { "name": "dockey" })


//---- endScript