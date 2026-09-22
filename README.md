# GSAP Vertical List Image Stepper

A high-performance, scroll-driven interactive component featuring a synchronized text list, animated progress bar track indicator, and cross-fading image switcher built with **GSAP (GreenSock)** and **ScrollTrigger**.

---

## 🛠 Tech Stack & Dependencies
* **Animation Core:** GSAP v3.12.5 (`gsap.min.js`)
* **Scroll Engine:** GSAP ScrollTrigger v3.12.5 (`ScrollTrigger.min.js`)
* **Navigation Plugin:** GSAP ScrollToPlugin v3.12.5 (`ScrollToPlugin.min.js`) (enables smooth programmatic scrolling when clicking individual list items)
* **Styling:** Native CSS (Flexbox, custom properties, responsive layout handling)
* **Markup:** Semantic HTML5

---

## 📂 Repository Structure
```text
gsap-vertical-list-image-stepper/
├── index.html       # Standalone testing page & layout structure
├── style.css        # Scoped layout styling, line track, and image wrappers
├── main.js          # GSAP timeline, pinning, scroll scrubbing, and click-to-scroll logic
└── README.md        # Technical documentation & integration guide
```

---

## 🚀 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nilokadnedzar/gsap-vertical-list-image-stepper.git
   cd gsap-vertical-list-image-stepper
   ```
2. **Run locally:**
   Open `index.html` directly in your browser, or spin up a local development server (e.g., using VS Code *Live Server* or a local PHP server) to test the scroll-pinning behavior.

---

## ⚙️ WordPress Integration Guide

To cleanly implement this component into a WordPress theme (custom template, page builder block, or ACF Flexible Content), follow these steps:

### Step 1: Enqueue GSAP & Plugins
Add the following snippet to your theme's `functions.php` to register and load GSAP along with required plugins:

```php
function enqueue_vertical_stepper_assets() {
    // GSAP Core
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true);
    
    // GSAP ScrollTrigger Plugin
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', array('gsap'), '3.12.5', true);
    
    // GSAP ScrollTo Plugin (required for click-to-scroll navigation)
    wp_enqueue_script('gsap-scrollto', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js', array('gsap'), '3.12.5', true);

    // Component Script & Stylesheet
    wp_enqueue_script('vertical-stepper-js', get_template_directory_uri() . '/assets/js/vertical-stepper.js', array('gsap', 'gsap-scrolltrigger', 'gsap-scrollto'), '1.0', true);
    wp_enqueue_style('vertical-stepper-css', get_template_directory_uri() . '/assets/css/vertical-stepper.css', array(), '1.0');
}
add_action('wp_enqueue_scripts', 'enqueue_vertical_stepper_assets');
```

### Step 2: Implement Template Markup
Port the section markup from `index.html` into your WordPress template or custom block view file. For dynamic CMS management, you can loop through items using an **ACF Repeater Field**:

```php
<section class="feature-section">
    <div class="text-column">
        <ul class="word-list">
            <?php if( have_rows('stepper_items') ): 
                $i = 0;
                while( have_rows('stepper_items') ): the_row();
                    $title = get_sub_field('title');
                    $active_class = ($i === 0) ? 'active' : '';
            ?>
                <li class="word <?php echo $active_class; ?>"><?php echo esc_html($title); ?></li>
            <?php 
                $i++;
                endwhile; 
            endif; ?>
        </ul>
    </div>

    <div class="line-track">
        <div class="line-indicator"></div>
    </div>

    <div class="image-column">
        <div class="img-wrapper">
            <?php if( have_rows('stepper_items') ): 
                $j = 0;
                while( have_rows('stepper_items') ): the_row();
                    $image = get_sub_field('image');
                    $active_class = ($j === 0) ? 'active' : '';
            ?>
                <img class="feature-img <?php echo $active_class; ?>" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
            <?php 
                $j++;
                endwhile; 
            endif; ?>
        </div>
    </div>
</section>
```

### Step 3: Production Checklist for the Team
* Ensure all DOM element selectors (`.feature-section`, `.word`, `.feature-img`, `.line-indicator`) match your final HTML structure.
* Verify that debugging flags (such as `markers: true` in ScrollTrigger configurations) are removed before pushing updates to production.
* Test mobile viewports to ensure graceful fallback handling where fixed section pinning might require responsive layout adjustments.