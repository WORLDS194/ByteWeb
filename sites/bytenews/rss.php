<?php
// URL of the RSS feed (e.g., Google News or a tech site)
$feed_url = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';

// Fetch the content
$content = file_get_contents($feed_url);

// Load the XML
$xml = simplexml_load_string($content);

echo '<h1>' . htmlspecialchars($xml->channel->title) . '</h1>';
echo '<ul>';

// Loop through the first 10 items
$count = 0;
foreach ($xml->channel->item as $item) {
    if ($count >= 10) break;
    echo '<li><a href="' . htmlspecialchars($item->link) . '">' . htmlspecialchars($item->title) . '</a></li>';
    $count++;
}
echo '</ul>';
?>