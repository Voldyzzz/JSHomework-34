const ref = {
  table: document.querySelector("table"),
};

const data = ["investor", "manager", "assistant", "worker"];
let globalData;

const getWorker = (worker) => {
  setValuesToTable(worker, ref.table, "Worker");
};

const getAssistant = (assistant) => {
  setValuesToTable(assistant, ref.table, "Assistant");
  getFile(`data/${globalData[3]}.json`, getWorker);
};

const getManger = (manager) => {
  setValuesToTable(manager, ref.table, "Manager");
  getFile(`data/${globalData[2]}.json`, getAssistant);
};

const getInvestor = (investor) => {
  setValuesToTable(investor, ref.table, "Investor");
  getFile(`data/${globalData[1]}.json`, getManger);
};

const getData = (data) => {
  globalData = data;
  getFile(`data/${globalData[0]}.json`, getInvestor);
};

const getFile = (file, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", file);
  xhr.send();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      const IsStatus = xhr.status >= 200 && xhr.status < 400;
      const response = IsStatus ? JSON.parse(xhr.response) : [];

      cb(response);
    }
  });
};

getData(data);

function setValuesToTable(data, elementHTML, position) {
  const tr = document.createElement("tr");
  elementHTML.append(tr);
  const td = document.createElement("td");
  td.innerText = position;
  td.style.color = "blue";
  tr.append(td);

  for (const key in data) {
    const td = document.createElement("td");
    td.innerText = data[key];
    tr.append(td);
  }
}
