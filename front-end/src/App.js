import logo from "./logo.svg";
import "./App.css";
import MyTreeView from "./treeview";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  Box,
  TabPanel,
  Button,
  Input,
  InputGroup,
  InputAddon,
  InputLeftAddon,
  Checkbox,
  Link,
  Menu,
  MenuIcon,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuButton,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const obj = {
    a: { b: { c: { g: "h" } }, p: { u: "l" } },
    d: { e: { f: { i: "k" } } },
  };
  const [initialCheckedItems, setInitialCheckedItems] = useState({
    network: ["hostname", "gateway", "interface"],
  });
  const [yamlText, setYamlText] = useState("");
  const yamlObj = {
    network: {
      hostname: "basak-guney",
      gateway: "1234",
      interface: [
        "-name: basak\n surname: guney\n-name: burcak\n surname: guney\n",
      ],
    },
    "swarm-labels": [
      "-key: ahmet\nvalue: nesrin\n",
      "-key: basak\nvalue: burcak\n",
    ],
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [clicked, setClicked] = useState(false);
  const [redirection, setRedirection] = useState("inventory");
  const [showEditor, setShowEditor] = useState(true);
  function submitFile() {
    var input = document.getElementById("formFileSm");
    const formData = new FormData();
    console.log(input.files[0]);
    formData.append("files", input.files[0]);
    formData.append("filename", input.files[0].name);
    fetch("/", {
      method: "POST",
      body: formData,
    });

    window.location = "/" + ("" + input.files[0].name).split(".zip")[0];
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Stack direction="row">
              <ChakraProvider>
                {" "}
                <Box borderColor="lightgray" width="20%" borderWidth="1px">
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            color="#2C5282"
                          >
                            Change Environment
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text
                          backgroundColor="#38A169"
                          color="white"
                          textAlign="center"
                        >
                          Change Domain Name
                        </Text>
                        <InputGroup size="xs">
                          <InputLeftAddon background="#2C5282" color="white">
                            Domain Name
                          </InputLeftAddon>
                          <Input type="tel" placeholder="phone number" />
                        </InputGroup>

                        <Button
                          color="white"
                          backgroundColor="#2A4365"
                          size="xs"
                          marginY="10px"
                        >
                          Submit
                        </Button>
                        <br></br>
                        <br></br>
                        <Text
                          backgroundColor="#38A169"
                          color="white"
                          textAlign="center"
                        >
                          Change Common IP Parts
                        </Text>
                        <InputGroup size="xs">
                          <InputLeftAddon background="#2C5282" color="white">
                            IP1
                          </InputLeftAddon>
                          <Input type="tel" placeholder="phone number" />
                        </InputGroup>

                        <InputGroup size="xs" marginY="8px">
                          <InputLeftAddon background="#2C5282" color="white">
                            IP2
                          </InputLeftAddon>
                          <Input type="tel" placeholder="phone number" />
                        </InputGroup>
                        <Button
                          color="white"
                          backgroundColor="#2A4365"
                          size="xs"
                          marginY="10px"
                        >
                          Submit
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Box width="80%">
                  <ChakraProvider>
                    <Tabs size="md" variant="enclosed">
                      <TabList>
                        <Tab>Update Inventory</Tab>
                        <Tab>Create Inventory</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Stack gap={0} direction="row" width="50%">
                            <input
                              class="form-control form-control-sm"
                              id="formFileSm"
                              type="file"
                              name="files"
                            />
                            <Button
                              size="sm"
                              colorScheme="facebook"
                              onClick={submitFile}
                            >
                              Submit
                            </Button>
                          </Stack>
                          <Tabs defaultIndex={0}>
                            <TabList>
                              <Tab>Hosts</Tab>
                              <Tab>Host Vars</Tab>
                              <Tab>Group Vars</Tab>
                            </TabList>

                            <TabPanels>
                              <TabPanel>
                                {Object.keys(yamlObj).map((key) =>
                                  typeof yamlObj[key] == "object" ||
                                  Array.isArray(yamlObj[key]) ? (
                                    <>
                                      <Checkbox
                                        onChange={() => {
                                          setShowEditor(true);
                                          setShowEditor(false);
                                          setTimeout(setShowEditor(true), 30);
                                          let text = "";
                                          Object.keys(yamlObj).map((key) => {
                                            if (
                                              document.getElementById(key)
                                                .checked
                                            ) {
                                              text =
                                                text +
                                                document.getElementById(key)
                                                  .value;
                                              Object.keys(yamlObj[key]).map(
                                                (subKey) => {
                                                  document.getElementById(
                                                    key + "." + subKey + "div"
                                                  ).style.display = "block";
                                                }
                                              );
                                            } else {
                                              Object.keys(yamlObj[key]).map(
                                                (subKey) => {
                                                  document.getElementById(
                                                    key + "." + subKey + "div"
                                                  ).style.display = "none";
                                                  document.getElementById(
                                                    key + "." + subKey
                                                  ).checked = false;
                                                }
                                              );
                                            }
                                            Object.keys(yamlObj[key]).map(
                                              (subKey) => {
                                                if (
                                                  document.getElementById(
                                                    key + "." + subKey
                                                  ) !== null &&
                                                  document.getElementById(
                                                    key + "." + subKey
                                                  ).checked &&
                                                  document.getElementById(key)
                                                    .checked
                                                ) {
                                                  text =
                                                    text +
                                                    document.getElementById(
                                                      key + "." + subKey
                                                    ).value;
                                                }
                                              }
                                            );
                                          });
                                          setYamlText(text);
                                        }}
                                        value={
                                          typeof yamlObj[key] == "object" ||
                                          Array.isArray(yamlObj[key])
                                            ? key + ":\n"
                                            : key + ": " + yamlObj[key] + "\n"
                                        }
                                        id={key}
                                        defaultChecked={
                                          initialCheckedItems[key] !== undefined
                                            ? true
                                            : false
                                        }
                                      >
                                        {key}
                                      </Checkbox>
                                      <br></br>
                                      {Object.keys(yamlObj[key]).map((subKey) =>
                                        typeof yamlObj[key] == "object" ||
                                        Array.isArray(yamlObj[key]) ? (
                                          <>
                                            <div
                                              id={key + "." + subKey + "div"}
                                              style={{
                                                display:
                                                  initialCheckedItems[key] !==
                                                  undefined
                                                    ? "block"
                                                    : "none",
                                              }}
                                            >
                                              <Stack pl={6} mt={1} spacing={1}>
                                                <Checkbox
                                                  aria-invalid={false}
                                                  onChange={() => {
                                                    setShowEditor(true);
                                                    setShowEditor(false);
                                                    setTimeout(
                                                      setShowEditor(true),
                                                      30
                                                    );
                                                    let text = "";
                                                    Object.keys(yamlObj).map(
                                                      (key) => {
                                                        if (
                                                          document.getElementById(
                                                            key
                                                          ).checked
                                                        ) {
                                                          text =
                                                            text +
                                                            document.getElementById(
                                                              key
                                                            ).value;
                                                        }

                                                        Object.keys(
                                                          yamlObj[key]
                                                        ).map((subKey) => {
                                                          if (
                                                            document.getElementById(
                                                              key + "." + subKey
                                                            ) !== null &&
                                                            document.getElementById(
                                                              key + "." + subKey
                                                            ).checked &&
                                                            document.getElementById(
                                                              key
                                                            ).checked
                                                          ) {
                                                            text =
                                                              text +
                                                              document.getElementById(
                                                                key +
                                                                  "." +
                                                                  subKey
                                                              ).value;
                                                          }
                                                        });
                                                      }
                                                    );
                                                    setYamlText(text);
                                                  }}
                                                  id={key + "." + subKey}
                                                  value={
                                                    Array.isArray(yamlObj[key])
                                                      ? "  " +
                                                        (
                                                          "" +
                                                          yamlObj[key][subKey]
                                                        )
                                                          .substring(
                                                            0,
                                                            "" +
                                                              yamlObj[key][
                                                                subKey
                                                              ].length -
                                                              1
                                                          )
                                                          .replaceAll(
                                                            "\n",
                                                            "\n   "
                                                          ) +
                                                        "\n"
                                                      : typeof yamlObj[key][
                                                          subKey
                                                        ] == "object" ||
                                                        Array.isArray(
                                                          yamlObj[key][subKey]
                                                        )
                                                      ? "  " +
                                                        subKey +
                                                        ":\n" +
                                                        "    " +
                                                        (
                                                          "" +
                                                          yamlObj[key][subKey]
                                                        )
                                                          .substring(
                                                            0,
                                                            (
                                                              "" +
                                                              yamlObj[key][
                                                                subKey
                                                              ]
                                                            ).length - 1
                                                          )
                                                          .replaceAll(
                                                            "\n",
                                                            "\n    "
                                                          ) +
                                                        "\n"
                                                      : "  " +
                                                        subKey +
                                                        ": " +
                                                        yamlObj[key][subKey] +
                                                        "\n"
                                                  }
                                                  defaultChecked={
                                                    Array.isArray(
                                                      initialCheckedItems[key]
                                                    )
                                                      ? initialCheckedItems[
                                                          key
                                                        ].includes(subKey)
                                                        ? true
                                                        : false
                                                      : false
                                                  }
                                                >
                                                  {subKey}
                                                </Checkbox>
                                              </Stack>
                                            </div>
                                          </>
                                        ) : null
                                      )}
                                    </>
                                  ) : null
                                )}

                                <br></br>
                                {showEditor ? (
                                  <Editor
                                    options={1}
                                    width="50%"
                                    height="90vh"
                                    defaultLanguage="yaml"
                                    value={yamlText}
                                  >
                                    {yamlText}
                                  </Editor>
                                ) : null}
                              </TabPanel>
                              <TabPanel></TabPanel>
                              <TabPanel></TabPanel>
                            </TabPanels>
                          </Tabs>
                        </TabPanel>
                        <TabPanel></TabPanel>
                      </TabPanels>
                    </Tabs>
                  </ChakraProvider>
                </Box>
              </ChakraProvider>
            </Stack>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
