# Stove Pipe

This project was to build an RGB LED hat with a 5 x 18 grid display for my daughter to wear at the 2017 Mini Maker Faire in Seattle.

<img src="https://github.com/rejamison/stove-pipe/raw/master/cad/stove_pipe.gif" width="100%" />

The hat is powered by a Pi Zero W connected to a [FadeCandy](https://github.com/scanlime/fadecandy) to control the LEDs.  The hat's structure is 3D printed.

The LED animation code is written in Node.js and the project includes an iOS/Android app to control the hat using HTML5/JS in [Apache Cordova](https://cordova.apache.org/).

I spent about 4 hours actively coding and another 4 hours modeling the parts for 3D printing.  The entire project took about 7 days, mostly unmonitored printing, and another 2-3 hours for assembly.

## 3D Printing

<img align="right" width="40%" src="https://github.com/rejamison/stove-pipe/raw/master/cad/perspective.png" />

The hat is made up of 16 parts in 8 layers.  Each layer is split in two since I couldn't fit an entire ring onto my Ultimaker 2's 200x200 build plate.  The LED rings come in "odd" and "even" flavors so that the seam between halves doesn't line up between layers, making the assembled structure a bit sturdier.  If you have a larger printer, assembly could be greatly simplified by merging the halves of each layer together.

* top_half.stl, top_half.stl
* ![red](https://placehold.it/15/f03c15/000000?text=+) `ring_even_half.stl`, ![red](https://placehold.it/15/f03c15/000000?text=+) `ring_even_half.stl`
* ![blue](https://placehold.it/15/c5f015/000000?text=+)`ring_odd_half.stl`, ![blue](https://placehold.it/15/c5f015/000000?text=+) `ring_odd_half.stl`
* ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`, ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`
* ![blue](https://placehold.it/15/c5f015/000000?text=+)`ring_odd_half.stl`, ![blue](https://placehold.it/15/c5f015/000000?text=+) `ring_odd_half.stl`
* ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`, ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`
* ![blue](https://placehold.it/15/c5f015/000000?text=+) `ring_odd_half.stl`, ![blue](https://placehold.it/15/c5f015/000000?text=+) `ring_odd_half.stl`
* ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`, ![green](https://placehold.it/15/1589F0/000000?text=+) `ring_even_half.stl`
* ![yello](https://placehold.it/15/F0DE14/000000?text=+) `bottom_half_left.stl`, ![yello](https://placehold.it/15/F0DE14/000000?text=+) `bottom_half_right.stl`

`mount_plate.stl` is provided to mount the pi zero and fadecandy to, if desired.

STL files are located in the `cad/` sub-directory of the project and also on [Thingiverse](https://www.thingiverse.com/thing:2550326).

* Printed using white Polymaker Polymax PLA.
* 100% infill is required for even diffusion of the LEDs through the plastic.
* Full build with 6 LED layers requires ~1kg of filament.
* Sized for a 27" circumference, which accomodates a 23" head with room for ~1/2" padding, which is quite large.  You'll probably want to resize for your own head:
  * Figure out how big around your head is, then add 3" to the circumference to give room for about ~1/2" of padding.
  * Go to the OpenSCAD source file and play with the "pitch" parameter, which dictates the size of each LED cell in millimeters.  Smaller cells mean a smaller hat.
  * The "Outer Circumference in Inches" in the output console shows the current circumference based on the value you've set for "pitch".
  * Render each of the parts to STL files by commenting/uncommenting the appropriate module.

## Assembly

<img align="right" width="30%" src="https://github.com/rejamison/stove-pipe/raw/master/cad/led_holes.jpg" />

Execept for the top, I glued the layers on top of each other with CA glue.  I used screws between the halves of the LED rings, but these weren't really necessary as the entire structure seemed to hold together well with just glue.  

Once the rings were assembled, I plugged the individual RGB LEDs on the strand into the holes in each cell.  The holes are sized to the built-in fastening tabs on the RGB strand I purchased, so no gluing necessary.  Be sure to layout the LEDs in a continuous spiral, starting at the top ring and as you complete a layer, being sure to start the next layer in the same column as the last.  The strands I purchased came with 50 LEDs, but I did NOT connect them end-to-end, since the FadeCandy addresses at most 64 LEDs on a single run.

<img align="right" width="30%" src="https://github.com/rejamison/stove-pipe/raw/master/cad/mount_plate.jpg" />

I soldered pin headers to the FadeCandy, rather than directly solder wires to the board, for easy future scavenging. 

I mounted the Pi using 2.5M screws to the mount plate and snapped in the FadeCandy.  They're connected to each other with a short Micro-USB to Mini-USB cable. 

The 0 and 1 LED banks of the FadeCandy each include a signal and ground connection.  The data pins of the first strand is connected to 0 and the second strand to 1.  

<img align="right" width="30%" src="https://github.com/rejamison/stove-pipe/raw/master/cad/wiring.png" />

The FadeCandy ground pins should be shared with the ground of the LED strands, so I connected them to a terminal on a female 5.1mm x 2.1mm barrel jack connector.

The LED strands I chose use 12V vs. 5V, mostly because it was easier to get higher-amperage 12V batteries.  To create a 12V "rail", I connected both strands in parallel to the barrel jack, then connected a 6-foot extension to the jack.

Since the Pi uses 5V, I just connected a 6-foot Micro-USB to USB-B cable to the power connecter on the Pi.  I taped the 12V barrell jack and 5V USB cables together with some electrical tape to keep things tidy.  

**NOTE:  Since we're using both 12V and 5V, I recommend triple-checking your connections before applying power for the first time to avoid destroying your Pi.**

<img align="right" width="30%" src="https://github.com/rejamison/stove-pipe/raw/master/cad/hat_bottom.jpg" />

I used high-density foam from a craft store to pad the bottom of the hat, cutting thin strips and building up layers as I tried it on my daughter's head until the fit was comfortable and stable.  

I used the brim of a cheap hat I bought on Amazon, cutting off the top of the hat and inserting the remainder into the bottom of the 3D printed tube.  This ended up being more trouble than it's worth, as it was finicky to fit right with its compound curve and ultimately made the top-heavy hat even more unstable.  For V2, I'd just print a brim, or tack on a bit of foam-board.

## Software Installation

## Usage

## Bill of Materials

|Tools|
|---|
|CA Glue|
|Soldering Iron & Solder|
|Wire Cutters|
|Hobby Knife|

|Part|Qty|Cost Each|Total Cost|Link|Note|
|---|---|---|---|---|---|
|ALITOVE LED Strand (12V, 50 LEDs each)|2|$33|$66|[Amazon](https://www.amazon.com/ALITOVE-Individually-Addressable-Non-waterproof-Raspberry/dp/B014R5PC42/ref=sr_ph_1?ie=UTF8&qid=1505708800&sr=sr-1&keywords=alitove)||
|FadeCandy|1|$24|$24|[Amazon](https://www.amazon.com/Adafruit-FadeCandy-Dithering-USB-Controlled-NeoPixels/dp/B00JHJJF9W/ref=sr_1_1?ie=UTF8&qid=1505709068&sr=8-1&keywords=fadecandy)||
|Pi Zero W|1|$25|$25|[Amazon](https://www.amazon.com/CanaKit-Raspberry-Wireless-Official-Supply/dp/B071L2ZQZX/ref=sr_1_3?s=electronics&ie=UTF8&qid=1505709129&sr=1-3&keywords=pi+zero+w)|You don't need the case or power supply for this build, and can save $15 if you can find a barebones Zero W.|
|8GB Micro SD|1|$9|$9|[Amazon](https://www.amazon.com/gp/product/B010Q57SEE/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1)|8GB is overkill, but smaller wasn't really cheaper.|
|Micro USB to Mini USB Adapter|1|$4|$4|[Amazon](https://www.amazon.com/gp/product/B018M8YNDG/ref=od_aui_detailpages01?ie=UTF8&psc=1)|Wish they made smaller ones of these, and cheaper.  You could patch a cable together or even solder directly onto the FadeCandy board, but I prefered to keep this pluggable for future scavenging.|
|6" Mini USB Cable|1|$4|$4|[Amazon](https://www.amazon.com/gp/product/B00VU7PTKI/ref=oh_aui_detailpage_o02_s01?ie=UTF8&psc=1)||
|2.1mm x 5.5mm Male Jack|1|$1|$1|[Amazon](https://www.amazon.com/Wsdcam-5-5x2-1mm-Adapter-Connector-Security/dp/B0127J7NWE/ref=sr_1_5?s=electronics&ie=UTF8&qid=1505713491&sr=1-5&keywords=2.1mm+jack)||
|6" Male/Female 2.1mm x 5.5mm Cable|1|$7|$7|[Amazon](https://www.amazon.com/gp/product/B00FTH6WNS/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1)|Begrudgingly bought this.  You could build your own cable, but considering the amperage it would carry, I decided to splurge.|
|TalentCell 12V@6A/5V@2A 26000mAh Li-Ion Battery|1|$65|$65|[Amazon](https://www.amazon.com/gp/product/B016BJCRUO/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1)|This is overkill, but I wanted a battery rated at 12V@6A to drive the LEDs at peak brightness.  The capacity means the hat can run all-day, maybe a couple of days.  Here's a cheaper one for $34 (and lighter too) rated for 12V@3A and 12000mAk, you'll just need to reduce the LED brightness:  [Amazon](https://www.amazon.com/TalentCell-Rechargeable-12000mAh-Multi-led-indicator/dp/B00ME3ZH7C/ref=pd_sim_469_2?_encoding=UTF8&pd_rd_i=B00ME3ZH7C&pd_rd_r=JTRMQQ5059P468BMM7Q8&pd_rd_w=CCvzY&pd_rd_wg=HyrRu&psc=1&refRID=JTRMQQ5059P468BMM7Q8).  The battery is a handy component and easily re-used, so I consider it an investment.|
|White Top Hat|1|$9|$9|[Amazon](https://www.amazon.com/gp/product/B003E98N9O/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1)|See above, I attempted to use this for it's brim, but would just 3D print one instead.|
|High Density Foam Padding|1|$12|$12|[Amazon](https://www.amazon.com/FoamTouch-Upholstery-Cushion-Density-Height/dp/B01K01HJZM/ref=sr_1_5?ie=UTF8&qid=1505713224&sr=8-5&keywords=high+density+foam)||
|White Polymaker Polymax 750g|1|$46|$46|[Printed Solid](https://printedsolid.com/products/polymaker-polymax-pla-3mm-x-750g?variant=35756291468)|Polymaker is my go-to filament, by no means the cheapest you can get.  Used nearly an entire spool of 750g for this build.|
|2.5M Screws|1|$0|$0|[Amazon](https://www.amazon.com/Slaxry-Notebook-Laptop-SAMSUNG-TOSHIBA/dp/B01M04WWVV/ref=sr_1_9?ie=UTF8&qid=1506192897&sr=8-9&keywords=laptop+screws)|2.5M screws are a little hard to find, but an easy way to get them is to buy a screw kit assortment for laptops for a few dollars on Amazon.  I find the other sizes included to be pretty handy for projects.|
||||**$272**||

Prices as of 9/17/17.

Wow, more than I expected before adding it up.  Of course, I had most of this stuff laying around, so my only real outlay was the LED strands and the cables.  Everything is scavengable except the filament.

If I were building it again, I'd probably switch to an LED strip, which is a lot cheaper per LED (~$15 / 100 LEDs vs. $66 / 100 LEDs).  The cheaper battery, DIY cables, a barebones Pi Zero W and ditching the hat saves another $66, for a hypothetical total of $165.

If you're really looking for a cheap project, then you can get 1kg of cheap PLA for ~$25 and switch to a nano Arduino for ~$5 and skip the FadeCandy, though you'd have to roll your own code and drop the BLE support.  That gets the project into the ~$90-100 range which is mostly battery, filament and LEDs.

## Future Ideas

I'll probably never get to these, but here's some stuff I'd do with more time:

* Add a BLE characteristic that allows you to shutdown the Pi cleanly.
