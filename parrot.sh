#!/bin/bash

# Total number of frames
frame_count=10  # Update this with your actual frame count

# Loop through frames continuously
while true; do
    for ((i=0; i<frame_count; i++)); do
        # Clear the terminal each loop to avoid artifacts
        tput reset
        # Fetch and display the current frame
        curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt"
        # Adjust speed if necessary
        sleep 0.001
    done
done
