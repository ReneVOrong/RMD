
#!/bin/bash

# |------------------------------------------------------------|
# | Filename    : ETL_TableauDM.sh                             |
# | Author      : Rene V Orong                                 |
# | Date Written: 10 Apr 2018                                  |
# | Client      : Roche Molecular Diagnostics                  |
# | Abstract    : Utility                                      |
# | Description : BASH Shell script - executes JavaScripts to  |
# |               ETL from dc to TableauDM Collections.        |
# |                                                            |
# | Usage      : ./ETL_TableauDM.sh  or  sh /ETL_TableauDM.sh  |
# |               make sure to chmod 755 the file              |
# |                                                            |
# |------------------------------------------------------------|
# |                  MODIFICATION HISTORY                      |  
# |------------------------------------------------------------|
# | Modified By    Date    Ver    Description Of Modification  |
# | -----------    ----    ---    -----------------------------|
# | ReneVOrong  10Apr2018  1.0  1. Written.                    |
# |------------------------------------------------------------|



cd /opt/dc/mongo/etl



echo "|-----------------------------------|"
echo "| ETL TABLEAU DATA MART COLLECTIONS |  " `date`
echo "|-----------------------------------|"



echo " "
echo "    --- Processing D_PTELSA..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - D_PTELSA.js"


echo " "
echo "    --- Processing F_Analysis..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Analysis.js"


echo " "
echo "    --- Processing F_Manifest..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Manifest.js"


echo " "
echo "    --- Processing F_Metrics..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Metrics.js"


echo " "
echo "    --- Processing F_Performance..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - F_Performance.js"


echo " "
echo "    --- CREATING INDEXES FOR ALL COLLECTIONS..." `date`
echo " "
mongo 10.39.39.112:27017/rochedc "Aggregate dc - Create Indexes.js"



echo "|---------------------------------------------------|"
echo "| END OF ETL SCRIPTS, TABLEAU DM COLLECTIONS LOADED | " `date`
echo "|---------------------------------------------------|"
