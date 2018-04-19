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
      { $out: "F_Performance_Test_Lane" } 
  ]);

//.......1.........2.........3.........4.......5.........6.........7.........8.........9.........1.........2.........3.........4.........6.........7.........8.........9.........1.........2.........3	  

//---- syntax 1
//'Trace Level'    : { $cond: { if: { $eq: [ { $indexOfBytes: [ '$name', "demux" ] }, 0 ] }, then: 'Lane', else: 'Sample' }},    	
//Lane01          : { $indexOfBytes: [ '$name', "demux" ] },		