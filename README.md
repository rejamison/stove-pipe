# Stove Pipe

This project was to build an RGB LED hat (as in, for your head) with a 5 x 18 grid display for my daughter to wear at the 2017 Mini Maker Faire in Seattle.

The hat is powered by a Pi Zero W connected to a [FadeCandy](https://github.com/scanlime/fadecandy) to control the LEDs.  The hat's structure is 3D printed.

I spent about 4 hours actively coding and another 4 hours modeling the parts for 3D printing.  The entire project took about 7 days, mostly for printing, and another 2-3 hours for assembly.  

# Materials

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
||||**$272**||

Prices as of 9/17/17.

Wow, more than I expected before adding it up.  Of course, I had most of this stuff laying around, so my only real outlay was the LED strands and the cables.  Everything is scavengable except the filament.

If I were building it again, I'd probably switch to an LED strip, which is a lot cheaper per LED (~$15 / 100 LEDs vs. $66 / 100 LEDs).  The cheaper battery, DIY cables, a barebones Pi Zero W and ditching the hat saves another $66, for a hypothetical total of $165.

If you're really looking for a cheap project, then you can get 1kg of cheap PLA for ~$25 and switch to a nano Arduino for ~$5 and skip the FadeCandy, though you'd have to roll your own code and drop the BLE support.  That gets the project into the ~$90-100 range which is mostly battery, filament and LEDs.
