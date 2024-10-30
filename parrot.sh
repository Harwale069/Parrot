#!/bin/bash

# Total number of frames
frame_count=10  # Update based on your actual frame count

# Array to store frames
frames=()

# Preload all frames
for ((i=0; i<frame_count; i++)); do
    frames[i]=$(curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt")
done

# Loop through preloaded frames continuously
while true; do
    for ((i=0; i<frame_count; i++)); do
        # Clear terminal
        clear
        # Display frame from memory
        echo "${frames[i]}"
        # Adjust speed if necessary
        sleep 0.05
    done
done
