/*----------------------------------------------
 Filename    :  Create AGG_ANALYSIS.js
 Author      :  Rene V Orong
 Date Written:  11 Apr 2018
 Abstract    :  Merge D_PTELSA with F_ANALYSIS via dockey to create a single Aggregate Collection.
                
 Usage       :  1.  from the JavaScript file directory:  > mongo localhost:27017/rochedc "Create AGG_ANALYSIS.js"
                2.            or, from the mongo shell:  > load("Create AGG_ANALYSIS.js")        
                
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  11Apr2018   v1   1. Written 

 ----------------------------------------------*/

use rochedc;

db.F_Analysis.aggregate
  ([
      { $lookup     : { from         :  'D_PTELSA', 
                        localField   :  'dockey',
                        foreignField :  'dockey',
                        as           :  'D_PTELSA_Record' } },
      { $replaceRoot: { newRoot      : { $mergeObjects: [ { $arrayElemAt: [ '$D_PTELSA_Record', 0 ] }, '$$ROOT' ] } } },
      { $project    : { fromItems    :   0 } }, 
      { $out        :  "AGG_ANALYSIS" } 
  ]);
  
//---- endScript