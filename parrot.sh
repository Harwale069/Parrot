#!/bin/bash

# Number of frames (adjust this based on how many frames you have)
frame_count=10 

# Loop forever
while true; do
    for ((i=0; i<frame_count; i++)); do
        # Clear the terminal
        clear
        # Display the current frame
        curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt"
        # 
        sleep 0.00000000001# Adjust as needed
    done
done
