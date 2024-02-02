from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def click_element_by_xpath(url, xpath):
    # Create a new instance of the Firefox driver (you can use other browsers as well)
    driver = webdriver.Chrome()

    try:
        # Open the website
        driver.get(url)

        # Wait for the element to be clickable (you may need to adjust the timeout)
        element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )

        # Click the element
        element.click()

        # Do further processing if needed

    finally:
        # Close the browser window when done
        driver.quit()

def get_buttons_with_single_letter(url):
    # Create a new instance of the Firefox driver (you can use other browsers as well)
    driver = webdriver.Firefox()

    try:
        # Open the website
        driver.get(url)

        # Find all buttons with only one letter as content
        buttons = driver.find_elements(By.XPATH, '//button[string-length(text())=1]')

        # Print the XPath for each matching button
        for i, button in enumerate(buttons, start=1):
            xpath = driver.execute_script(
                "function getPathTo(element) {" +
                "  if (element.id !== '')" +
                "    return 'id(\"' + element.id + '\")';" +
                "  if (element === document.body)" +
                "    return element.tagName;" +
                "  var ix = 0;" +
                "  var siblings = element.parentNode.childNodes;" +
                "  for (var i = 0; i < siblings.length; i++) {" +
                "    var sibling = siblings[i];" +
                "    if (sibling === element)" +
                "      return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';" +
                "    if (sibling.nodeType === 1 && sibling.tagName === element.tagName)" +
                "      ix++;" +
                "  }" +
                "}"
                "return getPathTo(arguments[0]);", button
            )

            print(f"Button {i} XPath:", xpath, button.text)

    finally:
        # Close the browser window when done
        driver.quit()

def click_button_by_content(url, button_content):
    # Create a new instance of the Firefox driver (you can use other browsers as well)
    driver = webdriver.Firefox()

    try:
        # Open the website
        driver.get(url)

        # Find the button with the specified content
        button = driver.find_element(By.XPATH, f'//button[text()="{button_content}"]')

        # Print the XPath of the found button
        xpath = driver.execute_script(
            "function getPathTo(element) {" +
            "  if (element.id !== '')" +
            "    return 'id(\"' + element.id + '\")';" +
            "  if (element === document.body)" +
            "    return element.tagName;" +
            "  var ix = 0;" +
            "  var siblings = element.parentNode.childNodes;" +
            "  for (var i = 0; i < siblings.length; i++) {" +
            "    var sibling = siblings[i];" +
            "    if (sibling === element)" +
            "      return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';" +
            "    if (sibling.nodeType === 1 && sibling.tagName === element.tagName)" +
            "      ix++;" +
            "  }" +
            "}"
            "return getPathTo(arguments[0]);", button
        )

        print(f"Button '{button_content}' XPath:", xpath)

        # Click the button
        button.click()

    finally:
        # Close the browser window when done
        driver.quit()

# Example usage
url_to_scrape = 'https://6mal5.com'
get_buttons_with_single_letter(url_to_scrape)
click_button_by_content(url_to_scrape, "enter")

# Example usage
# xpath_of_element_to_click = '//*[@id="exampleElement"]'  # Replace with the actual XPath

# click_element_by_xpath(url_to_scrape, xpath_of_element_to_click)