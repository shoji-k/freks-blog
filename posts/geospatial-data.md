---
title: '地理空間情報のデータ形式について調べてみた'
date: '2019-10-12'
---

地理空間情報のデータ形式について調べてみました

## ShapeFile

Esri 社の提唱したベクトル形式の地理情報システムの業界標準フォーマットらしいです

ファイルの拡張子としては .shp だがこれだけではなく、

- .shx —シェープインデックス規格；地形データの前方検索、後方検索を高速にするための位置インデックス
- .dbf —属性規格；各シェープに対する縦表形式の属性情報。dBASE IV 形式準拠。

が必須らしい  
引用: [シェープファイル \- Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%97%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)

[政府統計の総合窓口](https://www.e-stat.go.jp/) から [大阪市西区](https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521&toukeiYear=2015&serveyId=A002005212015&prefCode=27&coordsys=1&format=shape) のデータを取ってきて見て zip を解凍してみると

```
h27ka27106.dbf
h27ka27106.prj
h27ka27106.shp
h27ka27106.shx
```

の 4 ファイル入ってました  
バイナリでテキストエディタで開いても読めないので  
[mapshaper](https://mapshaper.org/) でファイルを読み込ませると表示させられました

## KMZ

KML を zip 圧縮したもの  
解凍ソフトで解凍すると KML になります

## KML

もともとは Keyhole Markup Language だったらしいが今は意味なく KML らしい  
Keyhole が Google Earth の前身で、Google Earth 用だったけど標準化されてる

XML で Google Earth や Google Map で目印付けたりするデータとして使える

[政府統計の総合窓口](https://www.e-stat.go.jp/) から [大阪市西区]((https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521&toukeiYear=2015&serveyId=A002005212015&prefCode=27&coordsys=1&format=kml)
からデータを取ってきて見てみます

kmz 形式なので、解凍ソフトで解凍しました

```
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>jSTAT MAP</name>
  <open>1</open>
  <Style id="AddressShape1036">
    <LineStyle>
      <width>2</width>
      <color>FF8080FF</color>
    </LineStyle>
    <PolyStyle>
      <color>00000000</color>
    </PolyStyle>
  </Style>
  <Style id="AddressName1036">
    <LabelStyle>
      <scale>0.8</scale>
      <color>FFFFFFFF</color>
    </LabelStyle>
  </Style>
  <Folder>
    <name>h27ka27106</name>
    <Placemark>
      <name>土佐堀１丁目</name>
      <visibility>1</visibility>
      <open>0</open>
      <styleUrl>#AddressShape1036</styleUrl>
      <LookAt>
        <heading>0.0</heading>
        <tilt>0</tilt>
        <range>5000.0</range>
        <longitude>135.4936727778</longitude>
        <latitude>34.6910072222</latitude>
      </LookAt>
      <ExtendedData>
        <SchemaData schemaUrl="#Attr1036">
          <SimpleData name="KEY_CODE">27106001001</SimpleData>
          <SimpleData name="PREF">27</SimpleData>
          <SimpleData name="CITY">106</SimpleData>
          <SimpleData name="S_AREA">001001</SimpleData>
          <SimpleData name="PREF_NAME">大阪府</SimpleData>
          <SimpleData name="CITY_NAME">西区</SimpleData>
          <SimpleData name="S_NAME">土佐堀１丁目</SimpleData>
          <SimpleData name="KIGO_E"></SimpleData>
          <SimpleData name="HCODE">8101</SimpleData>
          <SimpleData name="AREA">70364.265</SimpleData>
          <SimpleData name="PERIMETER">1491.587</SimpleData>
          <SimpleData name="H27KAxx_">1589</SimpleData>
          <SimpleData name="H27KAxx_ID">1588</SimpleData>
          <SimpleData name="KEN">27</SimpleData>
          <SimpleData name="KEN_NAME">大阪府</SimpleData>
          <SimpleData name="SITYO_NAME"></SimpleData>
          <SimpleData name="GST_NAME">大阪市</SimpleData>
          <SimpleData name="CSS_NAME">西区</SimpleData>
          <SimpleData name="KIHON1">0010</SimpleData>
          <SimpleData name="DUMMY1">-</SimpleData>
          <SimpleData name="KIHON2">01</SimpleData>
          <SimpleData name="KEYCODE1">106001001</SimpleData>
          <SimpleData name="KEYCODE2">106001001</SimpleData>
          <SimpleData name="AREA_MAX_F">M</SimpleData>
          <SimpleData name="KIGO_D"></SimpleData>
          <SimpleData name="N_KEN"></SimpleData>
          <SimpleData name="N_CITY"></SimpleData>
          <SimpleData name="KIGO_I"></SimpleData>
          <SimpleData name="MOJI">土佐堀１丁目</SimpleData>
          <SimpleData name="KBSUM">16</SimpleData>
          <SimpleData name="JINKO">469</SimpleData>
          <SimpleData name="SETAI">391</SimpleData>
          <SimpleData name="X_CODE">135.49339</SimpleData>
          <SimpleData name="Y_CODE">34.69076</SimpleData>
          <SimpleData name="KCODE1">0010-01</SimpleData>
        </SchemaData>
      </ExtendedData>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              135.4920609234,34.6888536304,100
              135.4926847384,34.6893913481,100
              135.4928186078,34.6895102261,100
              135.4935526860,34.6901527747,100
              135.4936779887,34.6902647144,100
              135.4938806034,34.6904299377,100
              135.4946977673,34.6911539589,100
              135.4948029433,34.6912458117,100
              135.4950672380,34.6914770697,100
              135.4957370439,34.6920655310,100
              135.4961174251,34.6924048827,100
              135.4962258201,34.6924867464,100
              135.4965155051,34.6927366996,100
              135.4960675140,34.6926911815,100
              135.4950529416,34.6925828877,100
              135.4948082276,34.6925177837,100
              135.4945769211,34.6924423100,100
              135.4943330620,34.6923136814,100
              135.4938142251,34.6918809243,100
              135.4936571841,34.6917436391,100
              135.4929115489,34.6910921686,100
              135.4928180751,34.6910114910,100
              135.4922388245,34.6905183293,100
              135.4918922968,34.6902944699,100
              135.4912888430,34.6899617812,100
              135.4906683632,34.6896252151,100
              135.4905854178,34.6895802166,100
              135.4908369535,34.6891763002,100
              135.4908438689,34.6891678776,100
              135.4908802490,34.6891238005,100
              135.4909957702,34.6889475391,100
              135.4910646642,34.6888424207,100
              135.4913163620,34.6884583763,100
              135.4913458405,34.6884134247,100
              135.4917705434,34.6886032412,100
              135.4918164298,34.6886428728,100
              135.4920609234,34.6888536304,100
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Folder>
</Document>
</kml>
```

とこんな感じ  
Google Map に取り込んでみるとイメージしやすいです  
[KML マップを Google Earth にインポートする \- パソコン \- Google Earth ヘルプ](https://support.google.com/earth/answer/7365595?co=GENIE.Platform%3DDesktop&hl=ja)

## GML

Geography Markup Language (GML)は Open Geospatial Consortium (OGC)によって開発された地理的特徴を表現する XML ベースのマークアップ言語、だそうです
引用: [Geography Markup Language \- Wikipedia](https://ja.wikipedia.org/wiki/Geography_Markup_Language)

[政府統計の総合窓口](https://www.e-stat.go.jp/) から [大阪市西区](https://www.e-stat.go.jp/gis/statmap-search?page=1&type=2&aggregateUnitForBoundary=A&toukeiCode=00200521&toukeiYear=2015&serveyId=A002005212015&prefCode=27&coordsys=1&format=gml) のデータをダウンロードして解凍して

定義っぽいファイル h27ka27106.xsd が

```
<?xml version="1.0" encoding="UTF-8"?>
<schema xmlns:fme="http://www.safe.com/gml/fme" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xmlns="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.safe.com/gml/fme" elementFormDefault="qualified">
<import namespace="http://www.opengis.net/gml" schemaLocation="http://schemas.opengis.net/gml/3.1.1/base/gml.xsd"/>
<element name="h27ka27106" type="fme:h27ka27106Type" substitutionGroup="gml:_Feature"/>
<complexType name="h27ka27106Type">
<complexContent>
<extension base="gml:AbstractFeatureType">
<sequence>
<element name="KEY_CODE" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="PREF" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="CITY" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="S_AREA" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="PREF_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="CITY_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="S_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KIGO_E" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="HCODE" minOccurs="0" type="int"/>
<element name="AREA" minOccurs="0" type="double"/>
<element name="PERIMETER" minOccurs="0" type="double"/>
<element name="H27KAxx_" minOccurs="0" type="int"/>
<element name="H27KAxx_ID" minOccurs="0" type="int"/>
<element name="KEN" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KEN_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="SITYO_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="GST_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="CSS_NAME" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KIHON1" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="DUMMY1" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KIHON2" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KEYCODE1" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KEYCODE2" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="AREA_MAX_F" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KIGO_D" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="N_KEN" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="N_CITY" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KIGO_I" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="MOJI" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element name="KBSUM" minOccurs="0" type="int"/>
<element name="JINKO" minOccurs="0" type="int"/>
<element name="SETAI" minOccurs="0" type="int"/>
<element name="X_CODE" minOccurs="0" type="double"/>
<element name="Y_CODE" minOccurs="0" type="double"/>
<element name="KCODE1" minOccurs="0">
<simpleType>
<restriction base="string">
<maxLength value="256"/>
</restriction>
</simpleType>
</element>
<element ref="gml:surfaceProperty" minOccurs="0"/>
<element ref="gml:multiSurfaceProperty" minOccurs="0"/>
</sequence>
</extension>
</complexContent>
</complexType>
</schema>
```

本体っぽいファイル h27ka27106.gml の一部を取り出してみると

```
<?xml version="1.0" encoding="UTF-8"?>
<gml:FeatureCollection xmlns:fme="http://www.safe.com/gml/fme" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.safe.com/gml/fme h22ka01101.xsd">
<gml:boundedBy>
<gml:Envelope srsName="EPSG:4612" srsDimension="2">
<gml:lowerCorner>34.6668630556 135.4620480556</gml:lowerCorner>
<gml:upperCorner>34.6928108333 135.4980319444</gml:upperCorner>
</gml:Envelope>
</gml:boundedBy>
<gml:featureMember>
<fme:h27ka27106 gml:id="id0">
<fme:KEY_CODE>27106001001</fme:KEY_CODE>
<fme:PREF>27</fme:PREF>
<fme:CITY>106</fme:CITY>
<fme:S_AREA>001001</fme:S_AREA>
<fme:PREF_NAME>大阪府</fme:PREF_NAME>
<fme:CITY_NAME>西区</fme:CITY_NAME>
<fme:S_NAME>土佐堀１丁目</fme:S_NAME>
<fme:KIGO_E></fme:KIGO_E>
<fme:HCODE>8101</fme:HCODE>
<fme:AREA>70364.265</fme:AREA>
<fme:PERIMETER>1491.587</fme:PERIMETER>
<fme:H27KAxx_>1589</fme:H27KAxx_>
<fme:H27KAxx_ID>1588</fme:H27KAxx_ID>
<fme:KEN>27</fme:KEN>
<fme:KEN_NAME>大阪府</fme:KEN_NAME>
<fme:SITYO_NAME></fme:SITYO_NAME>
<fme:GST_NAME>大阪市</fme:GST_NAME>
<fme:CSS_NAME>西区</fme:CSS_NAME>
<fme:KIHON1>0010</fme:KIHON1>
<fme:DUMMY1>-</fme:DUMMY1>
<fme:KIHON2>01</fme:KIHON2>
<fme:KEYCODE1>106001001</fme:KEYCODE1>
<fme:KEYCODE2>106001001</fme:KEYCODE2>
<fme:AREA_MAX_F>M</fme:AREA_MAX_F>
<fme:KIGO_D></fme:KIGO_D>
<fme:N_KEN></fme:N_KEN>
<fme:N_CITY></fme:N_CITY>
<fme:KIGO_I></fme:KIGO_I>
<fme:MOJI>土佐堀１丁目</fme:MOJI>
<fme:KBSUM>16</fme:KBSUM>
<fme:JINKO>469</fme:JINKO>
<fme:SETAI>391</fme:SETAI>
<fme:X_CODE>135.49339</fme:X_CODE>
<fme:Y_CODE>34.69076</fme:Y_CODE>
<fme:KCODE1>0010-01</fme:KCODE1>
<gml:surfaceProperty>
<gml:Surface srsName="EPSG:4612" srsDimension="2">
<gml:patches>
<gml:PolygonPatch>
<gml:exterior>
<gml:LinearRing>
<gml:posList>34.6888536304 135.4920609234 34.6893913481 135.4926847384 34.6895102261 135.4928186078 34.6901527747 135.4935526860 34.6902647144 135.4936779887 34.6904299377 135.4938806034 34.6911539589 135.4946977673 34.6912458117 135.4948029433 34.6914770697 135.4950672380 34.6920655310 135.4957370439 34.6924048827 135.4961174251 34.6924867464 135.4962258201 34.6927366996 135.4965155051 34.6926911815 135.4960675140 34.6925828877 135.4950529416 34.6925177837 135.4948082276 34.6924423100 135.4945769211 34.6923136814 135.4943330620 34.6918809243 135.4938142251 34.6917436391 135.4936571841 34.6910921686 135.4929115489 34.6910114910 135.4928180751 34.6905183293 135.4922388245 34.6902944699 135.4918922968 34.6899617812 135.4912888430 34.6896252151 135.4906683632 34.6895802166 135.4905854178 34.6891763002 135.4908369535 34.6891678776 135.4908438689 34.6891238005 135.4908802490 34.6889475391 135.4909957702 34.6888424207 135.4910646642 34.6884583763 135.4913163620 34.6884134247 135.4913458405 34.6886032412 135.4917705434 34.6886428728 135.4918164298 34.6888536304 135.4920609234</gml:posList>
</gml:LinearRing>
</gml:exterior>
</gml:PolygonPatch>
</gml:patches>
</gml:Surface>
</gml:surfaceProperty>
</fme:h27ka27106>
</gml:featureMember>
</gml:LinearRing>
</gml:exterior>
</gml:PolygonPatch>
</gml:patches>
</gml:Surface>
</gml:surfaceProperty>
</fme:h27ka27106>
</gml:featureMember>
</gml:FeatureCollection>
```

といった感じです

## GeoJSON

[GeoJSON \- Wikipedia](https://ja.wikipedia.org/wiki/GeoJSON) を見ると例もあって分かりやすいです

[政府統計の総合窓口](https://www.e-stat.go.jp/) の市区町村データにこの形式はありませんでした  
ShapeFile や KML から変換して使ってたりはするようです

Google Map が GeoJSON を丸ごとロードしたりできます  
sample: https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
