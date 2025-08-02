// replace.js
(function() {
    // Default replacements (baked into the script)
    const defaultReplacements = [
        { fetchUrl: "/templates/header.html", replaceTag: "header" },
        { fetchUrl: "/templates/footer.html", replaceTag: "footer" }
    ];

    function runReplacements() {
        // Find our script tag by src attribute
        const scripts = document.getElementsByTagName('script');
        let replaceScript = null;
        
        for (let script of scripts) {
            if (script.src.includes('js/replace.js')) {
                replaceScript = script;
                break;
            }
        }

        let customInstructions = [];
        
        if (replaceScript && replaceScript.textContent.trim() !== '') {
            customInstructions = replaceScript.textContent.split('\n')
                .map(line => line.trim())
                .filter(line => line.startsWith('fetch:'))
                .map(line => {
                    const [fetchPart, replacePart] = line.split(',');
                    const fetchUrl = fetchPart.split('"')[1];
                    const replaceTag = replacePart.split(':')[1].trim();
                    return { fetchUrl, replaceTag };
                });
        }

        // Combine default and custom instructions
        const allReplacements = [...defaultReplacements, ...customInstructions];

        // Process all replacements
        allReplacements.forEach(({ fetchUrl, replaceTag }) => {
            const elements = document.getElementsByTagName(replaceTag);
            
            if (elements.length > 0) {
                fetch(fetchUrl)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to fetch ${fetchUrl}`);
                        return response.text();
                    })
                    .then(html => {
                        Array.from(elements).forEach(element => {
                            const temp = document.createElement('div');
                            temp.innerHTML = html;
                            const newContent = temp.firstChild || temp;
                            
                            // Copy all attributes from original element
                            Array.from(element.attributes).forEach(attr => {
                                newContent.setAttribute(attr.name, attr.value);
                            });
                            
                            element.parentNode.replaceChild(newContent, element);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runReplacements);
    } else {
        runReplacements();
    }
})();