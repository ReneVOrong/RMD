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
 
db.dc.aggregate
  ([
      { $match:   {           f_filename :          /.*pipeline.*/i         ,  
                    $and: [ { name       :  { $not: /.*ck_.*/i           } },  
                  { $and: [ { name       :  { $not: /.*kill_workflow.*/i   } 
                  } ] } ] } },
                  
      { $project: { 
                    _id              :  0, 
	  	             dockey          : '$dockey', 
				    'f_type'         : '$f_type',
				     name            : '$name',
				     realtime        : '$realtime',
					 rss             : '$rss',
					'Percentage CPU' : '$percentage_cpu',
  					'f_filename'     : '$f_filename',
  					 Module          : { $substr: [ '$name', 0, { $indexOfBytes: [ '$name', ' ' ] } ] },  					 	      				  
 			    
   				    'Trace Level'    : { $cond: [ { $or: [ { $eq: [ { $indexOfBytes: [ '$name', "demux" ] }, 0 ] }, 
   				                                           { $eq: [ { $indexOfBytes: [ '$name', "phix"  ] }, 0 ] } 
   				                                         ] }, 'Lane', 'Sample' ] },    	
   				                                         	   				                                          				     				    		                                       
	                'Load Date'      :  new ISODate()	                
	              }              
	  },  // $project
      { $out: "F_Performance" } 
  ]);

//---- endScript


//  db.getCollection("F_Performance").createIndex({ "dockey": 1 }, { "name": "dockey" })
//  db.F_Performance.dropIndex("dockey")

//.......1.........2.........3.........4.......5.........6.........7.........8.........9.........1.........2.........3.........4.........6.........7.........8.........9.........1.........2.........3	  

//---- $cond syntax 1
//'Trace Level'    : { $cond: { if: { $eq: [ { $indexOfBytes: [ '$name', "demux" ] }, 0 ] }, then: 'Lane', else: 'Sample' }},   
 	