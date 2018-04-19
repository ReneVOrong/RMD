/*----------------------------------------------
 Filename    :  aggregate D_PTELSA.js
 Author      :  Rene V Orong
 Date Written:  27 March 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                PTELSA and Run Time Dimension
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  27Mar2018  v1   1. Written 

 ----------------------------------------------*/

//use rochedc;
use TableauDM;

db.dc.aggregate
  ([
      { $match:   {  f_type     : 'analysis_summary' } },
	  { $project: { _id         :  0, 
	  	             dockey     : '$dockey', 
	                'Project'   : '$projectname', 
					'Task'      : '$taskname',
					'Experiment': '$experimentname',
					'Lanename'  : '$lanename',
					'Analysis'  : '$analysisid',
					'Sample'    : '$samplename',
					'Run Time'  : '$run_time',
					'PTELSA'    : { $concat: [ '$projectname',    '~', 
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

//---- create index

//  db.getCollection("D_PTELSA").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true })

//  db.getCollection("D_PTELSA").createIndex({ "Project": 1 })
//  db.getCollection("D_PTELSA").createIndex({ "Task": 1 })
//  db.getCollection("D_PTELSA").createIndex({ "Experiment": 1 })
//  db.getCollection("D_PTELSA").createIndex({ "Lanename": 1 })
//  db.getCollection("D_PTELSA").createIndex({ "Sample": 1 })
//  db.getCollection("D_PTELSA").createIndex({ "Analysis": 1 })