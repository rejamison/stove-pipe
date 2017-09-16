$fn = 200;

pitch = 31;
led_per_stack = 1;
height = pitch * led_per_stack;
led_per_layer = 16;
inner_radius = (pitch * led_per_layer) / (2 * 3.14159);
wall_depth = 1.2;
led_radius = (11.5+.2)/2;
led_cell_depth=20;
notch_diag=(wall_depth*2);
notch_height=(notch_diag)/1.4142;

echo("Inner Diameter", (inner_radius * 2));
echo("Outer Diameter", ((inner_radius + 10) * 2));
echo("Outer Circumference Inches", ((inner_radius + 10) * 2 * 3.14159) / 25.4);
echo("LED Count", led_per_stack * led_per_layer);
echo("Amps Needed", led_per_stack * led_per_layer * .06);

//ring_even_half_left();
//ring_even_half_right();
//ring_odd_half_left();
//ring_odd_half_right();
//top_half_left();
//top_half_right();
//bottom_half_left();
//bottom_half_right();

module bottom_half_left() {
    difference() {
        union() {
            cylinder(r=inner_radius+led_cell_depth,h=pitch*1.5);
            translate([0,-(inner_radius+led_cell_depth),0]) cube([(pitch/2)+wall_depth, (inner_radius+led_cell_depth) * 2, pitch*1.5]);
        }
        translate([0,0,pitch/2-.01]) cylinder(r1=inner_radius-wall_depth, r2=inner_radius-wall_depth*4+led_cell_depth ,h=pitch+.02);
        translate([0,0,-.01]) cylinder(r=inner_radius-wall_depth,h=pitch+.02);
        translate([(pitch/2)+wall_depth,-(inner_radius+led_cell_depth),-1]) cube([500, (inner_radius+led_cell_depth) * 2, pitch*1.5+2]);
        translate([0,-(inner_radius-wall_depth),-1]) cube([500, (inner_radius-wall_depth) * 2, pitch+2]);
        translate([0+.01,inner_radius-wall_depth-.01,pitch/2-.01]) rotated_prism((pitch/2)+wall_depth,led_cell_depth-wall_depth*3,pitch+.02,180,0,0);
        translate([0+.01,-inner_radius+wall_depth-led_cell_depth+wall_depth*3+.01,pitch/2-.01]) rotated_prism((pitch/2)+wall_depth,led_cell_depth-wall_depth*3,pitch+.02,180,0,180);
    }
}

module bottom_half_right() {
    difference() {
        translate([pitch+wall_depth*2,0,0]) rotate([0,0,180]) bottom_half_left();
        translate([inner_radius-6,0,-pitch]) rotate([0,45,0]) cylinder(d=10,h=100);
    }
}

module top_half_left() {
    difference() {
        union() {
            cylinder(r=inner_radius+led_cell_depth,h=wall_depth*2);
            translate([0,-(inner_radius+led_cell_depth),0]) cube([pitch/2+wall_depth, (inner_radius+led_cell_depth) * 2, wall_depth*2]);
        }
        translate([pitch/2+wall_depth,-(inner_radius+led_cell_depth),-1]) cube([500, (inner_radius+led_cell_depth) * 2, wall_depth*2+2]);
        for(i = [0:1:led_per_layer - 1]) {
            translate([0,0,wall_depth*2]) rotate([45,0,i * (360 / led_per_layer)]) translate([inner_radius+((led_cell_depth-wall_depth)/4)-.1,-(notch_height)/2-.1,-(notch_height)/2-.1]) cube([(led_cell_depth-wall_depth)/2+.2,notch_height+.2,notch_height+.2]);
        }
    }
}

module top_half_right() {
    translate([pitch+wall_depth*2,0,0]) rotate([0,0,180]) top_half_left();
}

module ring_even_half_left() {
    difference() {
        union() {
            // outer ring
            difference() {
                cylinder(r=inner_radius+led_cell_depth,h=height);
                translate([0,0,-1]) cylinder(r=inner_radius+led_cell_depth-wall_depth,h=height+2);
            }

            // inner ring and ribs
            difference() {
                union() {
                    cylinder(r=inner_radius,h=height);
                    for(i = [0:1:led_per_layer - 1]) {
                        rotate([0,0,i * (360 / led_per_layer)]) translate([inner_radius-wall_depth,-(wall_depth),0]) cube([led_cell_depth,wall_depth*2,height]);
                        translate([0,0,height]) rotate([45,0,i * (360 / led_per_layer)]) translate([inner_radius+((led_cell_depth-wall_depth)/4),-(notch_height)/2,-(notch_height)/2]) cube([(led_cell_depth-wall_depth)/2,notch_height,notch_height]);
                    }
                    for(i = [0:1:led_per_stack - 1]) {
                        translate([0,0,pitch*i]) cylinder(r=inner_radius+led_cell_depth,h=wall_depth*2);
                    }
                }
                translate([0,0,-1]) cylinder(r=inner_radius-wall_depth,h=height+10);
                for(i = [0:1:led_per_layer - 1]) {
                    rotate([45,0,i * (360 / led_per_layer)]) translate([inner_radius+((led_cell_depth-wall_depth)/4)-.1,-(notch_height)/2-.1,-(notch_height)/2-.1]) cube([(led_cell_depth-wall_depth)/2+.2,notch_height+.2,notch_height+.2]);
                    rotate([90,0,(360 / led_per_layer) * (i + 0.5)]) translate([0,pitch/2 + wall_depth,wall_depth]) cylinder(r=led_radius,h=inner_radius);
                }
            }
        } 
        
        translate([0,-100,-100]) cube([200,200,200]);
    }

    // extension on one side
    translate([0,(inner_radius-wall_depth),0]) cube([pitch+(wall_depth*2),led_cell_depth+wall_depth,wall_depth*2]);
    translate([0,inner_radius+led_cell_depth-wall_depth,0]) cube([pitch+(wall_depth*2),wall_depth,height]);
    difference() {
        translate([0,inner_radius-wall_depth,0]) cube([pitch+(wall_depth*2),wall_depth,height]);
        rotate([-90,0,0]) translate([pitch/2+wall_depth,-pitch/2 - wall_depth,wall_depth]) cylinder(r=led_radius,h=inner_radius);
    }
    translate([pitch+wall_depth,inner_radius-wall_depth,0]) cube([wall_depth,led_cell_depth+wall_depth,height]);
    translate([0,inner_radius-wall_depth,0]) cube([wall_depth,led_cell_depth+wall_depth,height]);

    // tabs
    rotate([0,0,180]) translate([-pitch-wall_depth*2,0,0]) difference() {  
        translate([0,-inner_radius+height/3+wall_depth-.001,height]) prism(wall_depth*1.5,-height/3,-3*height/4);
        rotate([0,90,0]) translate([-7*height/8,-inner_radius+height/8+wall_depth,-1]) cylinder(d=3,h=wall_depth*2+2);
    }
    rotate([0,0,0]) translate([0,0,0]) difference() {  
        translate([-wall_depth*1.5,-inner_radius+height/3+wall_depth,height]) prism(wall_depth*1.5,-height/3,-3*height/4);
        rotate([0,90,0]) translate([-7*height/8,-inner_radius+height/8+wall_depth,-4]) cylinder(d=3,h=wall_depth*2+2);
    }
}

module ring_even_half_right() {
    translate([pitch+wall_depth*2,0,0]) rotate([0,0,180]) ring_even_half_left();
}

module ring_odd_half_left() {
    difference() {
        union() {
            // outer ring
            difference() {
                cylinder(r=inner_radius+led_cell_depth,h=height);
                translate([0,0,-1]) cylinder(r=inner_radius+led_cell_depth-wall_depth,h=height+2);
            }

            // inner ring and ribs
            difference() {
                union() {
                    cylinder(r=inner_radius,h=height);
                    for(i = [0:1:led_per_layer - 1]) {
                        rotate([0,0,i * (360 / led_per_layer)]) translate([inner_radius-wall_depth,-(wall_depth),0]) cube([led_cell_depth,wall_depth*2,height]);
                        translate([0,0,height]) rotate([45,0,i * (360 / led_per_layer)]) translate([inner_radius+((led_cell_depth-wall_depth)/4),-(notch_height)/2,-(notch_height)/2]) cube([(led_cell_depth-wall_depth)/2,notch_height,notch_height]);
                    }
                    for(i = [0:1:led_per_stack - 1]) {
                        translate([0,0,pitch*i]) cylinder(r=inner_radius+led_cell_depth,h=wall_depth*2);
                    }
                }
                translate([0,0,-1]) cylinder(r=inner_radius-wall_depth,h=height+10);
                for(i = [0:1:led_per_layer - 1]) {
                    rotate([45,0,i * (360 / led_per_layer)]) translate([inner_radius+((led_cell_depth-wall_depth)/4)-.1,-(notch_height)/2-.1,-(notch_height)/2-.1]) cube([(led_cell_depth-wall_depth)/2+.2,notch_height+.2,notch_height+.2]);
                    rotate([90,0,(360 / led_per_layer) * (i + 0.5)]) translate([0,pitch/2 + wall_depth,wall_depth]) cylinder(r=led_radius,h=inner_radius);
                }
            }
        } 
        
        translate([0,-100,-100]) cube([200,200,200]);
    }

    // extension on one side
    translate([0,-(inner_radius-wall_depth)-led_cell_depth-wall_depth,0]) cube([pitch+(wall_depth*2),led_cell_depth+wall_depth,wall_depth*2]);
    translate([0,-inner_radius-led_cell_depth,0]) cube([pitch+(wall_depth*2),wall_depth,height]);
    difference() {
        translate([0,-inner_radius,0]) cube([pitch+(wall_depth*2),wall_depth,height]);
        rotate([90,0,0]) translate([pitch/2+wall_depth,pitch/2 + wall_depth,wall_depth]) cylinder(r=led_radius,h=inner_radius);
    }
    translate([pitch+wall_depth,-inner_radius-led_cell_depth,0]) cube([wall_depth,led_cell_depth+wall_depth,height]);
    translate([0,-inner_radius-led_cell_depth,0]) cube([wall_depth,led_cell_depth+wall_depth,height]);

    // tabs
    rotate([0,0,0]) translate([pitch+wall_depth/2,0,0]) difference() {  
        translate([0,-inner_radius+height/3+wall_depth,height]) prism(wall_depth*1.5,-height/3,-3*height/4);
        rotate([0,90,0]) translate([-7*height/8,-inner_radius+height/8+wall_depth,-1]) cylinder(d=3,h=wall_depth*2+2);
    }
    rotate([0,0,180]) translate([0,0,0]) difference() {  
        translate([0,-inner_radius+height/3+wall_depth,height]) prism(wall_depth*1.5,-height/3,-3*height/4);
        rotate([0,90,0]) translate([-7*height/8,-inner_radius+height/8+wall_depth,-1]) cylinder(d=3,h=wall_depth*2+2);
    }
}

module ring_odd_half_right() {
    translate([pitch+wall_depth*2,0,0]) rotate([0,0,180]) ring_odd_half_left();
}

module rotated_prism(l, w, h, a, b, c) {
    translate([l/2,w/2,h/2]) rotate([a,b,c]) translate([-l/2,-w/2,-h/2]) prism(l,w,h);
}

module prism(l, w, h) {
   polyhedron(
           points=[[0,0,0], [l,0,0], [l,w,0], [0,w,0], [0,w,h], [l,w,h]],
           faces=[[0,1,2,3],[5,4,3,2],[0,4,5,1],[0,3,4],[5,2,1]]
           );
   
}