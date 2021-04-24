#!/usr/bin/env node
async function fn() {

  let promise = new Promise((resolve, _reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  // wait until the promise resolves (*)
  let result = await promise; 

  // "done!"
  console.log(result);
}

fn();
