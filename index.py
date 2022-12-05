import pandas as pd
import copy

# Task 1
s = []
c = 0
for i in range(1, 10):
    s.append((0 + c, 3 + c))
    c += 4

df_stack = pd.read_fwf(
    "***",
    header=None,
    names=range(1, 10),
    nrows=8,
    colspecs=s,
)

s1 = df_stack[1][::-1].dropna().tolist()
s2 = df_stack[2][::-1].dropna().tolist()
s3 = df_stack[3][::-1].dropna().tolist()
s4 = df_stack[4][::-1].dropna().tolist()
s5 = df_stack[5][::-1].dropna().tolist()
s6 = df_stack[6][::-1].dropna().tolist()
s7 = df_stack[7][::-1].dropna().tolist()
s8 = df_stack[8][::-1].dropna().tolist()
s9 = df_stack[9][::-1].dropna().tolist()

dict_stack = {1: s1, 2: s2, 3: s3, 4: s4, 5: s5, 6: s6, 7: s7, 8: s8, 9: s9}
dict_stack2 = copy.deepcopy(dict_stack)

df_inst = pd.read_csv(
    "***",
    names=["Move", "Qnt", "From", "fCol", "To", "tCol"],
    skiprows=9,
    delim_whitespace=1,
    index_col=False,
)
df_inst.drop(["Move", "From", "To"], axis=1, inplace=True)

for i in range(0, len(df_inst)):
    crates = dict_stack[df_inst["fCol"][i]][-df_inst["Qnt"][i] :]
    del dict_stack[df_inst["fCol"][i]][-df_inst["Qnt"][i] :]
    dict_stack[df_inst["tCol"][i]] = (
        dict_stack[df_inst["tCol"][i]] + crates[::-1]
    )
print(sum(map(len, dict_stack.values())))
dict_stack = {k: v for k, v in dict_stack.items() if v}

ans1 = []
for i in dict_stack.keys():
    ans1.append(dict_stack[i][-1])
ans1 = (
    str(ans1)
    .replace("'", "")
    .replace("[", "")
    .replace("]", "")
    .replace(",", "")
    .replace(" ", "")
)

print(ans1)  # Answer 1

# Task 2
for i in range(0, len(df_inst)):
    crates = dict_stack2[df_inst["fCol"][i]][-df_inst["Qnt"][i] :]
    del dict_stack2[df_inst["fCol"][i]][-df_inst["Qnt"][i] :]
    dict_stack2[df_inst["tCol"][i]] = dict_stack2[df_inst["tCol"][i]] + crates
print(sum(map(len, dict_stack2.values())))
dict_stack2 = {k: v for k, v in dict_stack2.items() if v}

ans2 = []
for i in dict_stack2.keys():
    ans2.append(dict_stack2[i][-1])
ans2 = (
    str(ans2)
    .replace("'", "")
    .replace("[", "")
    .replace("]", "")
    .replace(",", "")
    .replace(" ", "")
)

print(ans2)  # Answer 2