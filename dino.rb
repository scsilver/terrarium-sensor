require 'bundler/setup'
require 'dino'
require 'pusher'
board = Dino::Board.new(Dino::TxRx::Serial.new)
lightSensor = Dino::Components::Sensor.new(pin: 'A0', board: board)
servo = Dino::Components::Servo.new(pin: '3', board: board)
led = Dino::Components::Led.new(pin: '7', board: board)

aTempSensor = Dino::Components::Sensor.new(pin: 'A2', board: board)
motion = Dino::Components::Sensor.new(pin: 'A1', board: board)
count1 = 0
count2 = 0
Pusher.url = "https://60dbe63931b29368c58c:6f0fac727cfb5a675818@api.pusherapp.com/apps/146837"
lamp = Dino::Components::Led.new(pin: 8, board: board)
time = Time.new

night = 19
day = 9
puts time

=begin

(0..7).each do |i|

  if humTempSensor.update == :LOW

    while humTempSensor.update == :LOW do
      sleep(0.030);
    end
      if humTempSensor.update == :HIGH
        read_data |= (1<<(7-i))
      end
    while humTempSensor.update == :HIGH do
    end
  end
end
=end
#light
lightSensor.when_data_received do |data|
  time = Time.new

  light = data
  count1 = count1 + 1
  if count1 % 200 == 0
    Pusher.trigger('sensor_channel', 'light_event', {value: light})

    led.send(:on)
    sleep 0.5
    led.send(:off)

    puts light
    puts time


    if time.hour >= day
      if  night > time.hour
        lamp.send(:on)
        puts  "on"

        sleep 0.5
      end
    end
    if night <= time.hour
      lamp.send(:off)
      puts "off"

      sleep 0.5
    end
    if  time.hour < day

      lamp.send(:off)
      sleep 0.5
    end
  end


end
#Analog Temp Sensor
aTempSensor.when_data_received do |data|
  atemp = Math.log(10000.0*((1024.0/data.to_i-1)))
  atemp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * atemp * atemp ))* atemp )
  atemp = (atemp - 273.15)*1.8+32
  atemp = atemp.round(2)
  count2 = count2 + 1
  if count2 % 200 == 0
     Pusher.trigger('sensor_channel', 'atemp_event', {value: atemp})
     led.send(:on)
     sleep 0.5
     led.send(:off)

     puts atemp
   end
end

#Digital Temp Sensor
=begin
humTemp.initialized do |data|
humTempSensor.when_data_received do |data|

humTempSensor.digital_write(:LOW);
sleep 0.000030
humTempSensor.digital_write(:HIGH);
sleep 0.000040
  while humTempSensor.update == :HIGH
  end
  sleep 0.000080 //
    if humTempSensor.update == :LOW
    end
  sleep 0.000080 //

  (0..4).each do |i|
    dat[i] = read

for(int i=0;i<4;i++)
dat[i] = read_data();
pinMode(DHpin,OUTPUT);
digitalWrite(DHpin,HIGH);

}
=end
sleep
