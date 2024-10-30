#!/bin/bash

# Number of frames (adjust this based on how many frames you have)
frame_count=10 

# Loop forever
while true; do
    for ((i=0; i<frame_count; i++)); do
        # Move cursor to the top left of the terminal
        tput cup 0 0
        # Display the current frame
        curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt"
        # No pause between frames
        sleep 0.001  # 
    done
done
