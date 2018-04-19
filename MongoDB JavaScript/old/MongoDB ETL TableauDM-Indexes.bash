#!/usr/bin/bash

# |------------------------------------------------------------|
# | Filename    : MongoDB_ETL_TableauDM.bash                   |
# | Author      : Rene V Orong                                 |
# | Date Written: 10 Apr 2018                                  |
# | Client      : Roche Molecular Diagnostics                  |
# | Abstract    : Utility                                      |
# | Description : BASH Shell script - executes JavaScripts to  |
# |               ETL from dc to TableauDM.                    |
# |                                                            |
# | Usage      : ./Mongo_ETL_TableauDM.bash                    |
# |                                                            |
# |------------------------------------------------------------|
# |                  MODIFICATION HISTORY                      |  
# |------------------------------------------------------------|
# | Modified By    Date    Ver    Description Of Modification  |
# | -----------    ----    ---    -----------------------------|
# | ReneVOrong  10Apr2018  1.0  1. Written.                    |                                                            |
# |------------------------------------------------------------|

# |------------------------------------------------------------|
# |                        FUNCTIONS                           |
# |------------------------------------------------------------|

cd /opt/dc/mongo/etl


# |------------------------------------------------------------|
# |                        MAIN PROCEDURE                      |
# |------------------------------------------------------------|

echo " "
echo "BEGIN ETL SCRIPTS..."
echo " "


mongo 10.39.39.112:27017/rochedc "Aggregate dc - D_PTELSA.js"
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Analysis.js"
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Manifest.js"
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Metrics.js"
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Performance.js"

mongo 10.39.39.112:27017/rochedc "Create Indexes.js"


echo " "
echo "END OF ETL SCRIPT ..."
echo " "

# |------------------------------------------------------------|
# |                        END OF FILE                         |
# |------------------------------------------------------------|