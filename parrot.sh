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
        # Wait a moment before showing the next frame
        sleep 0.000001  # Adjust the speed as needed
    done
done
