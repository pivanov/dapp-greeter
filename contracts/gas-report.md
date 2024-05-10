No files changed, compilation skipped

Ran 4 tests for test/Greeter.t.sol:GreeterTest
[PASS] test_GetCount() (gas: 15864)
[PASS] test_GetMessageCount() (gas: 38316)
[PASS] test_InitialGreeting() (gas: 18496)
[PASS] test_SetGreeting() (gas: 81763)
Suite result: ok. 4 passed; 0 failed; 0 skipped; finished in 946.42µs (319.92µs CPU time)

Ran 2 tests for test/Counter.t.sol:CounterTest
[PASS] test_IncrementCount() (gas: 41030)
[PASS] test_IncrementCountByUser(address) (runs: 256, μ: 56067, ~: 56154)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 9.13ms (8.07ms CPU time)
| src/Counter.sol:Counter contract |                 |       |        |       |         |
|----------------------------------|-----------------|-------|--------|-------|---------|
| Deployment Cost                  | Deployment Size |       |        |       |         |
| 119919                           | 339             |       |        |       |         |
| Function Name                    | min             | avg   | median | max   | # calls |
| getCount                         | 471             | 1472  | 2471   | 2471  | 517     |
| incrementCount                   | 26658           | 43820 | 43974  | 43974 | 259     |


| src/Greeter.sol:Greeter contract |                 |       |        |       |         |
|----------------------------------|-----------------|-------|--------|-------|---------|
| Deployment Cost                  | Deployment Size |       |        |       |         |
| 723543                           | 3944            |       |        |       |         |
| Function Name                    | min             | avg   | median | max   | # calls |
| getCount                         | 7658            | 7658  | 7658   | 7658  | 1       |
| getMessageCount                  | 30129           | 30129 | 30129  | 30129 | 1       |
| greet                            | 2076            | 4326  | 4326   | 6576  | 2       |
| setGreeting                      | 66352           | 66352 | 66352  | 66352 | 1       |




Ran 2 test suites in 14.50ms (10.08ms CPU time): 6 tests passed, 0 failed, 0 skipped (6 total tests)
