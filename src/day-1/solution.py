# Collect and parse data into two lists of numbers
from typing import Counter


list_a = []
list_b = []
with open("data.txt", "r") as file:
    for line in file:
        num_strs = line.strip().split('   ')
        list_a.append(int(num_strs[0]))
        list_b.append(int(num_strs[1]))


# Solve Part 1. We can't possibly solve this without sorting each list completely,
# so we know we can't do better than NlogN. We have to do that twice, then we have to keep
# a running sum of the absolute difference between elements at each index (O(N)).

# Sort (NlogN)
list_a.sort()
list_b.sort()

# Calculate distance (O(N))
total_distance = 0
for i in range(len(list_a)):
    total_distance += abs(list_a[i] - list_b[i])

print('Total Distance: ' + str(total_distance))

# Solve Part 2. Find the similarity score. For each number in list_a, the similarity score
# is that number multiplied by the number of times it appears in list_b. Find the total
# similarity score. We can iterate through list_b to map numbers to number of occurences (O(N)).
# Then we iterate through list_a (O(N)) and lookup the number of occurences (O(1)) of the number.
# So we have solved in O(N) which is optimal since we have to look at the entire list.

# Create the map (O(N))
counts = Counter(list_b)

# Compute the similarity score (O(N))
similarity_score = sum(n * counts.get(n, 0) for n in list_a)

print('Similarity Score: ' + str(similarity_score))

