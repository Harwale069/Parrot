#!/bin/bash

frame_count=10  # Adjust based on your frame count

while true; do
    for ((i=0; i<frame_count; i++)); do
        clear  # Clear the terminal
        tput reset  # Reset for additional assurance
        curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt"
        sleep 0.001
    done
done
