// Read and parse the data
import * as fs from "fs";

const data: string = fs.readFileSync("data.txt", "utf-8");
const lines: string[] = data.split("\n");
const reports: number[][] = lines.map((x) =>
    x.split(" ").map((y) => Number(y))
);

// Solve part 1. Let's say there's R reports with L levels. When know we have
// to iterate through every report to find safe ones. For each report, the worst
// case is that it is a safe report because then we have to check every level.
// Therefore, the worst case is O(RL), but we can optimize by exiting a level as soon
// as it become unsafe.

const MAX_DISTANCE: number = 3;

const get_distance = (a: number, b: number): number => Math.abs(b - a);
const get_direction = (a: number, b: number): number => Math.sign(b - a);

const is_report_safe = (report: number[]): boolean => {
    let last_direction: number = 0;
    for (let i = 1; i < report.length; i++) {
        const distance: number = get_distance(report[i - 1], report[i]);
        const direction: number = get_direction(report[i - 1], report[i]);

        // Check for unsafe condition
        if (
            distance > MAX_DISTANCE ||
            (i == 1 && direction == 0) ||
            (i > 1 && direction != last_direction)
        ) {
            // Not safe!
            return false;
        }

        last_direction = direction;
    }
    return true;
};

// Main loop
let num_safe: number = 0;
for (const report of reports) {
    num_safe += is_report_safe(report) ? 1 : 0;
}

console.log("Number of safe reports: " + num_safe);

// Solve Part 2. Now we have a dampener that allows us to remove one bad level from each report. So, the first time we
// encounter a bad level, we have to remove something. We need to choose that "something" smartly. When we encounter an
// unsafe traversal, we need to remove something. Try removing the current number and keep going. After this, any more
// unsafe levels cannot be changed an we have to exit the report. However, we need to deal with some special cases.
// (1) If there is an unsafe distance between the first two levels, we need to check which one we should remove by
// checking the third. If there is a direction change at the 3rd level, we need to check if we should remove the third
// or the first depending on the fourth.
// Ok, this smart removal logic isnt easy. Let's change it up a bit. Since we know that report size will always be
// small, let's take a brute-froce approach to processing reports. Check if the report is unsafe. If so, try removing
// each element, one at a time, to see if it becomes safe. But you can only do this once, so if there's two hits, it's
// defintiely unsafe!

const is_report_safe_with_one_removal = (report: number[]): boolean => {
    for (let i = 0; i < report.length; i++) {
        const new_report = report.slice(0, i).concat(report.slice(i + 1));
        if (is_report_safe(new_report)) {
            return true;
        }
    }
    return false;
};

// Main loop
num_safe = 0;
for (const report of reports) {
    num_safe +=
        is_report_safe(report) || is_report_safe_with_one_removal(report)
            ? 1
            : 0;
}

console.log("Number of safe reports with dampener: " + num_safe);
