/*----------------------------------------------
 Filename    :  Aggregate F_Performance.js
 Author      :  Rene V Orong
 Date Written:  29 March 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                PTELSA and Run Time Dimension
                
                *elapsed time = 20seconds   records = 2,632,367
                
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  29Mar2018  v1   1. Written 

 ----------------------------------------------*/

//use rochedc;

db.dc.aggregate
  ([
      //{ $limit: 100000 },
      { $match:   {           f_filename :          /.*pipeline.*/i         ,  
                    $and: [ { name       :  { $not: /.*ck_.*/i           } },  
                  { $and: [ { name       :  { $not: /.*kill_workflow.*/i   } 
                  } ] } ] } },
                  
      { $project: { _id              :  0, 
	  	             dockey          : '$dockey', 
				    'f_type'         : '$f_type',
				     name            : '$name',
				     realtime        : '$realtime',
					 rss             : '$rss',
					'Percentage CPU' : '$percentage_cpu',
  					'f_filename'     : '$f_filename',
  					 Module          : { $substr: [ '$name', 0, { $indexOfBytes: [ '$name', ' ' ] } ] },
  					 
  		            //'Trace Level'    : { $match: { name:   /.*demux.*/i, 'demux' ] }, then: 'Lane', else: 'Sample' }}
  		            
   		            'Trace Level'    : { $cond: { if: { $eq: ['$Module', 'demux' ] }, then: 'Lane', else: 'Sample' }},
   		            'Load Date'      :  new ISODate()
				  } 
	  }, 
      { $out: "F_Performance" } 
  ]);
  
//---- endScript


//  db.getCollection("F_Performance").createIndex({ "dockey": 1 }, { "name": "dockey" })
//  db.F_Performance.dropIndex("dockey")