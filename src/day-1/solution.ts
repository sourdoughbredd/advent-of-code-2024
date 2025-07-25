import * as fs from "fs";

// Collect and parse data into two lists of numbers
const data: string = fs.readFileSync("data.txt", "utf-8");
const lines: string[] = data.split("\n");

let list_a: number[] = [];
let list_b: number[] = [];
for (const line of lines) {
  const nums: number[] = line.split("   ").map((x) => Number(x));
  list_a.push(nums[0]);
  list_b.push(nums[1]);
}

// Solve Part 1. We can't possibly solve this without sorting each list completely,
// so we know we can't do better than NlogN. We have to do that twice, then we have to keep
// a running sum of the absolute difference between elements at each index (O(N)).

// Sort (NlogN)
list_a.sort();
list_b.sort();

// Calculate distance (O(N))
let total_distance: number = 0;
for (let i = 0; i < list_a.length; i++) {
  total_distance += Math.abs(list_a[i] - list_b[i]);
}

console.log("Total Distance: " + String(total_distance));

// Solve Part 2. Find the similarity score. For each number in list_a, the similarity score
// is that number multiplied by the number of times it appears in list_b. Find the total
// similarity score. We can iterate through list_b to map numbers to number of occurences (O(N)).
// Then we iterate through list_a (O(N)) and lookup the number of occurences (O(1)) of the number.
// So we have solved in O(N) which is optimal since we have to look at the entire list.

// Create the map (O(N))
const counts = new Map<number, number>();
for (const num of list_b) {
  counts.set(num, (counts.get(num) || 0) + 1);
}

// Compute the similarity score (O(N))
let similarity_score: number = 0;
for (const num of list_a) {
  similarity_score += num * (counts.get(num) || 0);
}

console.log("Similarity Score : " + similarity_score);
