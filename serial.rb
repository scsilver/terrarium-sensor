require "serialport"
require 'pusher'

port_str = "/dev/tty.usbmodemfd131"
baud_rate = 9600
data_bits = 8
stop_bits = 1
parity = SerialPort::NONE
Pusher.url = "https://60dbe63931b29368c58c:6f0fac727cfb5a675818@api.pusherapp.com/apps/146837"

sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)
while true do
  message = sp.gets
  if message
    message.chomp!
    
    Pusher.trigger('sensor_channel', 'data_event', {value: message})


    open('data.csv', 'a') { |file|
      if message.size > 42
        file.puts message
      end
    }
    puts message
    sleep 1
  end
end
