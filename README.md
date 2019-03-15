# simple-wind

## TODO

-[x] auto dl
-[x] crop data to extent and merge into onfile
-[x] blur colors a little
-[x] transition vector field
-[x] where is the 3 hour data?
-[x] does it move faster over the ocean? how do i get historical?

## Archie

-[ ] white bg
-[x] make it easy to set new data in
-[ ] timer bar on the bottom that fills in
-[ ] cat colors: three colors

## nope

-[ ] make it no lopsided : (
-[ ] sync rotation speed with time 
-[ ] webgl rewrite https://github.com/mapbox/webgl-wind https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f
-[ ] color based on velocity https://anvaka.github.io/fieldplay

Fancier transitions
- https://inspirit.github.io/jsfeat/#opticalflowlk
- https://github.com/anvaka/oflow
- https://en.wikipedia.org/wiki/Lucas%E2%80%93Kanade_method


## download data



set up grib2json

```
brew install maven
git clone git@github.com:cambecc/grib2json.git
cd grib2json
mvn package
```

Note from https://github.com/cambecc/earth

Weather data is produced by the Global Forecast System (GFS), operated by the US National Weather Service. Forecasts are produced four times daily and made available for download from NOMADS. The files are in GRIB2 format and contain over 300 records. We need only a few of these records to visualize wind data at a particular isobar. The following commands download the 1000 hPa wind vectors and convert them to JSON format using the grib2json utility:

```
YYYYMMDD=<a date, for example: 20140101>

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.${YYYYMMDD}00" -o 
gfs.t00z.pgrb2.1p00.f000

grib2json -d -n -o current-wind-surface-level-gfs-1.0.json gfs.t00z.pgrb2.1p00.f000
cp current-wind-surface-level-gfs-1.0.json
```


download files

http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl


```
mkdir raw-data

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091418" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091418

../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091418.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091418



curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091500" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091500
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091500.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091500

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t06z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091506" -o raw-data/gfs.t06z.pgrb2.1p00.f000.2018091506
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091506.json raw-data/gfs.t06z.pgrb2.1p00.f000.2018091506

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t12z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091512" -o raw-data/gfs.t12z.pgrb2.1p00.f000.2018091512
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091512.json raw-data/gfs.t12z.pgrb2.1p00.f000.2018091512

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091518" -o raw-data/gfs.t18z.pgrb2.1p00.f000.2018091518
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091518.json raw-data/gfs.t18z.pgrb2.1p00.f000.2018091518




curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091600" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091600
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091600.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091600

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t06z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091606" -o raw-data/gfs.t06z.pgrb2.1p00.f000.2018091606
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091606.json raw-data/gfs.t06z.pgrb2.1p00.f000.2018091606

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t12z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091612" -o raw-data/gfs.t12z.pgrb2.1p00.f000.2018091612
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091612.json raw-data/gfs.t12z.pgrb2.1p00.f000.2018091612

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091618" -o raw-data/gfs.t18z.pgrb2.1p00.f000.2018091618
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091618.json raw-data/gfs.t18z.pgrb2.1p00.f000.2018091618




curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091700" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091700
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091700.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091700

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t06z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091706" -o raw-data/gfs.t06z.pgrb2.1p00.f000.2018091706
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091706.json raw-data/gfs.t06z.pgrb2.1p00.f000.2018091706

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t12z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091712" -o raw-data/gfs.t12z.pgrb2.1p00.f000.2018091712
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091712.json raw-data/gfs.t12z.pgrb2.1p00.f000.2018091712

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091718" -o raw-data/gfs.t18z.pgrb2.1p00.f000.2018091718
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091718.json raw-data/gfs.t18z.pgrb2.1p00.f000.2018091718




curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091800" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091800
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091800.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091800

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t06z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091806" -o raw-data/gfs.t06z.pgrb2.1p00.f000.2018091806
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091806.json raw-data/gfs.t06z.pgrb2.1p00.f000.2018091806

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t12z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091812" -o raw-data/gfs.t12z.pgrb2.1p00.f000.2018091812
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091812.json raw-data/gfs.t12z.pgrb2.1p00.f000.2018091812

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091818" -o raw-data/gfs.t18z.pgrb2.1p00.f000.2018091818
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091818.json raw-data/gfs.t18z.pgrb2.1p00.f000.2018091818



curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091900" -o raw-data/gfs.t00z.pgrb2.1p00.f000.2018091900
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091900.json raw-data/gfs.t00z.pgrb2.1p00.f000.2018091900

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t06z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091906" -o raw-data/gfs.t06z.pgrb2.1p00.f000.2018091906
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091906.json raw-data/gfs.t06z.pgrb2.1p00.f000.2018091906

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t12z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091912" -o raw-data/gfs.t12z.pgrb2.1p00.f000.2018091912
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091912.json raw-data/gfs.t12z.pgrb2.1p00.f000.2018091912

curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t18z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2018091918" -o raw-data/gfs.t18z.pgrb2.1p00.f000.2018091918
../grib2json/target/grib2json-0.8.0-SNAPSHOT/bin/grib2json -d -n -o raw-data/2018091918.json raw-data/gfs.t18z.pgrb2.1p00.f000.2018091918
```



https://earth.nullschool.net/#2018/09/14/1800Z/wind/surface/level/equirectangular=-59.61,0.19,311




https://github.com/dthpham/butterflow












