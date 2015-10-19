/*
  SD card datalogger

 This example shows how to log data from three analog sensors
 to an SD card using the SD library.

 The circuit:
 * analog sensors on analog ins 0, 1, and 2
 * SD card attached to SPI bus as follows:
 ** MOSI - pin 11
 ** MISO - pin 12
 ** CLK - pin 13
 ** CS - pin 4

 created  24 Nov 2010
 modified 9 Apr 2012
 by Tom Igoe

 This example code is in the public domain.

 */

#include <SPI.h>
#include <SD.h>
#include "DHT.h"
#include <Time.h>


#define DHTPIN 2  
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);

const int chipSelect = 4;
int daytime = 9;
int nighttime = 20;
int lamp = 8;
int serialLED = 13;
String motion;



double Thermistor(int RawADC) {
  double Temp;
  Temp = log(10000.0*((1024.0/RawADC-1))); 
  Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
  Temp = Temp - 273.15;            // Convert Kelvin to Celcius
  Temp = (Temp * 9.0)/ 5.0 + 32.0; // Convert Celcius to Fahrenheit
   return Temp;
}

void setup()
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }


  Serial.print("Initializing SD card...");

  // see if the card is present and can be initialized:
  if (!SD.begin(chipSelect)) {
    Serial.println("Card failed, or not present");
    // don't do anything more:
    return;
  }
  Serial.println("card initialized.");
  dht.begin();
  pinMode(lamp, OUTPUT);
  pinMode(serialLED, OUTPUT);
  setTime(10,36,00,13,10,2015);

}

void loop()
{
  time_t t = now();
  String timestring = String(month()) + " " + String(day()) + " " + String(year()) + " " + String(hour()) + ":" + String(minute()) + ":";
  if (second() < 10)
  {
    timestring = timestring + "0" + String(second());
  }
  else 
  {
    timestring = timestring  + String(second());
  }
  
  
  
  if (hour() >= nighttime || hour() < daytime) {
    digitalWrite(lamp, LOW);
  }
  if (hour() >= daytime && hour() < nighttime) {
    digitalWrite(lamp, HIGH);
  }
    
    
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float temp = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  
  // make a string for assembling the data to log:
  String dataString = "";

  // read three sensors and append to the string:
  for (int analogPin = 0; analogPin < 3; analogPin++) {
    double sensor = analogRead(analogPin);
    if (analogPin == 1) 
    {
      if (sensor > 150)
      {
        motion = "Yes";
      }
      if (sensor < 150)
      {
        motion = "No";
      }
    }
    if (analogPin == 2) 
    {
      sensor = Thermistor(sensor);
    }
    dataString += String(sensor);
    if (analogPin < 2) {
      dataString += ", ";
    }
  }
  dataString = dataString + ", " + f + ", " + h + ", "+ motion + ", " + timestring;

  // open the file. note that only one file can be open at a time,
  // so you have to close this one before opening another.
  File dataFile = SD.open("datalog.txt", FILE_WRITE);

  // if the file is available, write to it:
  if (dataFile) {
    dataFile.println(dataString);
    dataFile.close();
    // print to the serial port too:
    Serial.println(dataString);
    digitalWrite(serialLED, HIGH);
    digitalWrite(serialLED, LOW);
  }
  // if the file isn't open, pop up an error:
  else {
    Serial.println("error opening datalog.txt");
  }
 
  delay(1000);
}









