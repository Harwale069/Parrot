#!/bin/bash

frame_count=10  # Number of frames in your animation

while true; do
    for ((i=0; i<frame_count; i++)); do
        # Clear the terminal to prevent leftover artifacts
        clear
        # Fetch and display each frame from the GitHub URL
        curl -s "https://raw.githubusercontent.com/Harwale069/Parrot/main/frames/$i.txt"
        # Control frame rate (adjust if needed)
        sleep 0.001
    done
done
