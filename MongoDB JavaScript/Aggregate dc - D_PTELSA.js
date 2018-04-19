/*----------------------------------------------
 Filename    :  Aggregate D_PTELSA.js
 Author      :  Rene V Orong
 Date Written:  27 March 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                PTELSA and Run Time Dimension
                
 Usage       :  1.  from the JavaScript file directory:  > mongo localhost:27017/rochedc "Aggregate dc - D_PTELSA.js"
                2.            or, from the mongo shell:  > load("Aggregate dc - D_PTELSA.js")        
                
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  27Mar2018  v1   1. Written 

 ----------------------------------------------*/

//use rochedc;

db.dc.aggregate
  ([
      { $match:   {  f_type     : 'analysis_summary' } },
	  { $project: { _id         :  0, 
	  	             dockey     : '$dockey', 
	                 Project    : '$projectname', 
					 Task       : '$taskname',
					 Experiment : '$experimentname',
					 Lane       : '$lanename',
					 Analysis   : '$analysisid',
					 Sample     : '$samplename',
					'Run Time'  : '$run_time',
					 PTELSA     : { $concat: [ '$projectname',    '~', 
					                           '$taskname',       '~', 
											   '$experimentname', '~', 
											   '$lanename',       '~',
                                               '$samplename',     '~',
											   '$analysisid'
											 ]
					              },
				    'Load Date':  new ISODate()
	              } 
	  }, 
      { $out: "D_PTELSA" } 
  ]);
  
//---- endScript