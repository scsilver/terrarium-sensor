#include "Dino.h"
#include <Servo.h>
#include "DHT.h"
Dino dino;
#define DHTPIN 2     // what pin we're connected to

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);
// Dino.h doesn't handle TXRX. Setup a function to tell it to write to Serial.
void writeResponse(char *response) { Serial.print(response); Serial.print("\n"); }
void (*writeCallback)(char *str) = writeResponse;
int count = 0;
void setup() {
  Serial.begin(115200);
  dino.setupWrite(writeCallback);
 dht.begin();
}

void loop() {
  
  
    while(Serial.available() > 0) dino.parse(Serial.read());
    float h = dht.readHumidity();
     float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  Serial.println(h);
  dino.updateListeners();
  Serial.flush();
  

  
  
}
