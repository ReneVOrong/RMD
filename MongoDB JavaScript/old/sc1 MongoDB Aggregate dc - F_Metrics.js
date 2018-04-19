/*----------------------------------------------
 Filename    :  aggregate F_Metrics.js
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
use TableauDM;

db.dc.aggregate
  ([
      { $match:   {   f_type                             : 'qc_metrics_summary' } },
      { $project: {  _id                                 :  0, 
	  	              dockey                             : '$dockey', 
				     'barcode_singleton'                 : '$barcode_singleton',
					 'bases_in_10fold_range'             : '$bases_in_10fold_range',
					 'bases_in_2fold_range'              : '$bases_in_2fold_range',
					 'dedup_depth'                       : '$dedup_depth',
					 'duplex_family'                     : '$duplex_family',
					 'duplex_reads'                      : '$duplex_reads',
					 'duplication_rate'                  : '$duplication_rate',
					 'error_free_positions'              : '$error_free_positions',
					 'error_rate'                        : '$error_rate',
					 'expected_sid'                      : '$expected_sid',
					 'fold_overseq'                      : '$fold_overseq',
					 'ge_recovery_rate'                  : '$ge_recovery_rate',
					 'input_massng'                      : '$input_massng',
					 'lane_total_reads'                  : '$lane_total_reads',
					 'mean_fragment_length'              : '$mean_fragment_length',
					 'median_fragment_length'            : '$median_fragment_length',
					 'nondedup_depth'                    : '$nondedup_depth',
					 'number_of_reads_binned_to_samples' : '$number_of_reads_binned_to_samples',
					 'paired_reads_mapped'               : '$paired_reads_mapped',
					 'panel_dedup_depth1000'             : '$panel_dedup_depth1000',
					 'panel_dedup_depth2000'             : '$panel_dedup_depth2000',
					 'panel_dedup_depth300'              : '$panel_dedup_depth300',
					 'panel_dedup_depth3000'             : '$panel_dedup_depth3000',
					 'panel_dedup_depth500'              : '$panel_dedup_depth500',
					 'panel_exon_region1000x'            : '$panel_exon_region1000x',
					 'panel_exon_region300x'             : '$panel_exon_region300x',
					 'panel_exon_region500x'             : '$panel_exon_region500x',
					 'peak_family_size'                  : '$peak_family_size',
					 'phix_reads'                        : '$phix_reads',
					 'q_ratio'                           : '$q_ratio',
					 'ratio_90thpct10thpct'              : '$ratio_90thpct10thpct',
					 'reads_binned_to_samples_post_phix' : '$reads_binned_to_samples_post_phix',
					 'reads_mapped'                      : '$reads_mapped',
					 'reads_ontarget'                    : '$reads_ontarget',
					 'sample_total_reads'                : '$sample_total_reads',
					 'whitelist_postion_1000x'           : '$whitelist_postion_1000x',
					 'whitelist_postion_300x'            : '$whitelist_postion_300x',
					 'whitelist_postion_500x'            : '$whitelist_postion_500x',
					 'adapter_r1'                        : '$adapter_r1',
					 'adapter_r2'                        : '$adapter_r2',
					 'genotyping_lod'                    : '$genotyping_lod',
					 'peak_family_size'                  : '$peak_family_size',
					 'Load Date'                         :  new ISODate()
				  } 
	  }, 
      { $out: "F_Metrics" } 
  ]);
  
//---- endScript


//  db.getCollection("F_Metrics").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true })
