import { SOSRule } from './sos-database';

export const SOS_DATA_1: SOSRule[] = [
  {
    id: 1,
    maintId: "N1420",
    issueParameter: "PC HIGH",
    recommendationIdn: "REQUIRED ACTIONS:\n> Inspect air inlet system and filter for dirt entry points. \n> Inspect compressor oil tank for damage and missing breathers.",
    recommendationAus: "REQUIRED ACTIONS:\n > Inspect air inlet system and filter for dirt entry points. \n > Inspect compressor oil tank for damage and missing breathers.\n >Record all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 2,
    maintId: "N1420",
    issueParameter: "PC HIGH 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Clean and flush sample port and resample to confirm oil condition.  \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 3,
    maintId: "N0550",
    issueParameter: "PC HIGH 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Clean and flush sample port and resample to confirm oil condition.  \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 6,
    maintId: "N0550",
    issueParameter: "Dirt Contamination",
    recommendationIdn: "RECOMMENDATION\n- Replace element separator air receiver tank if necessary due to NA always in above normal range\n- Check oil condition. Check for possible oil too dark or milky due to external contamination\n- Check for possible seal and gasket for leaks due to dirt entry contamination as shown by elevated Silicone and Aluminum\n- Clean up air cleaner\n- Check for possible oil mix with water\n- Check & Inspect Condition for Loseness & Leakage (for Piping, Fitting (Scavenging Lines) Hoses & Air Connections)\n- Cleaned up air cleaner & housing, also breather",
    recommendationAus: null,
    active: 1
  },
  {
    id: 7,
    maintId: "N0550",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil condition. Check for possible oil too dark or milky due to external contamination\n- Check for possible seal and gasket for leaks \n- Clean up air cleaner\n- Check & Inspect Condition for Loseness & Leakage (for Piping, Fitting (Scavenging Lines) Hoses & Air Connections)\n- Cleaned up air cleaner & housing, also breather\n?",
    recommendationAus: null,
    active: 1
  },
  {
    id: 8,
    maintId: "N4000",
    issueParameter: "Fe Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Perform  kidney loop filtering or change oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 9,
    maintId: "N4000",
    issueParameter: "Viscosity Oil Low 1",
    recommendationIdn: "RECOMMENDATION\n- Monitor oil level on transmission, hydraulic or bevel gear. Check Oil level (Overfull, in normal range, or below normal)\n- Check oil condition, and Check seal condition (Bevel Pinion Shaft Seal, or Duo Cone Seal)\n- Check for oil transfer possibility. Potential reason for the leaks is the failure of the pinion seal in the differential. May be oil leaks can also occur if the center plug of the differential pinion is not installed or if the center plug does not fit properly\n- Monitor for possible a lot of additional oil \n- Vacum axle if necessary to found leaks from transmission\n- Check for possible filling or add an oil with higher or lower grade oil\n- Please make sure to use correct type of oil the lighter weight oil can cause a final drive failure",
    recommendationAus: "REQUIRED ACTIONS:\n\n> Investigate compartment transfer, mark oil level on differential, hydraulics and transmission and check 50 SMU. If transfer is confirmed, discuss with site maintenance leadership team if leaking compartment should be replaced or resealed. \n> Resample oil to confirm oil condition.  \n> Drain and flush compartment. \n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 10,
    maintId: "N4000",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Suggest to do kidney loop or change oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 11,
    maintId: "N4000",
    issueParameter: "Dirt Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug Final drive pos 1, pos 2 and bevel gear for wear particle.\n- Determine the source of dirt contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left or  Perform kidneyloop filtering to remove contamination",
    recommendationAus: "REQUIRED ACTIONS:\n\n > Take resample to confirm oil condition. \n > Inspect duo-cone seal and drive cover for leaks. \n > Inspect breathers for leaks and condition. \n  \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 12,
    maintId: "N4000",
    issueParameter: "Oil Dark Color  &  Wear Metals Increase",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug Final drive pos 1, pos 2 and bevel gear for wear particle.\n- Determine the source of dirt contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left or Perform kidneyloop filtering to remove contamination",
    recommendationAus: null,
    active: 1
  },
  {
    id: 13,
    maintId: "N4000",
    issueParameter: "Viscosity High",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Clean and flush sample port and resample to confirm oil condition. \n \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 14,
    maintId: "N4000",
    issueParameter: "Oil Contamination",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Suggest to do kidney loop or change oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 15,
    maintId: "N4000",
    issueParameter: "Pb & Cu Increased 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n \n > Inspect differential / final drive filter for debris / contamination. \n > Take resample to confirm oil conditions. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section`",
    active: 1
  },
  {
    id: 16,
    maintId: "N4000",
    issueParameter: "Water Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of water contamination.\n- Check actual drain mag plug Final drive pos 1, pos 2 and bevel gear for wear particle.\n- Determine the source of water contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 17,
    maintId: "N4000",
    issueParameter: "Pb & Cu Increased 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Perform kidney loop filtering to remove contamination. \n OR \n > Drain and flush compartment. \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 18,
    maintId: "N4000",
    issueParameter: "Oil Transferred 1",
    recommendationIdn: "RECOMMENDATION\n- Check for oil transfer possibility\n- Monitor oil level on transmission, hydraulic or bevel gear. Check Oil level (Overfull, in normal range, or below normal)\n- Check oil condition, and Check seal condition (Bevel Pinion Shaft Seal, or Duo Cone Seal)\n- Monitor for possible a lot of additional oil \n- Check for possible filling or add an oil with higher or lower grade oil\n- Please make sure to use correct type of oil the lighter weight oil can cause a final drive failure",
    recommendationAus: "REQUIRED ACTIONS:\n > Investigate compartment transfer, mark oil level on differential, hydraulics \n and transmission and check 50 SMU. If transfer is confirmed, discuss with \n site maintenance leadership team if leaking compartment should be replaced \n or resealed. \n > Resample oil to confirm oil condition.  \n > Drain and flush compartment. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 19,
    maintId: "N4000",
    issueParameter: "PQ Increased",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Suggest to do kidney loop or change oil if found bad oil condition",
    recommendationAus: "REQUIRED ACTIONS:\n > Take resample to confirm oil condition. \n > Inspect differential / final drive filter for debris / contamination. \n > Check differential, left and right final drive mag-plugs. \n > Check breathers are in place, secure and in good condition. .\n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 20,
    maintId: "N4000",
    issueParameter: "Oil Interchanged",
    recommendationIdn: "RECOMMENDATION\n- Suggest to resample the oil and sent to tekenomiks to monitoring condition (as soon as possible)\n- Make sute to supply correct oil sample and correct labeling",
    recommendationAus: null,
    active: 1
  },
  {
    id: 21,
    maintId: "N4000",
    issueParameter: "Cu High",
    recommendationIdn: "Recommendation,\n- Check oil level & condition (Oil too dark may indicated depleted oil addictive)\n- Check for any oil leakage (seals, or gasket etc); oil leakage maybe sign of contaminaton entry point\n- Check for unusual noise on bevel gear & both final drives\n- Check magnetic plug rating on bevel gear & both final drives; please record rating\n- Drain small amount of oil & check for any visible particles/debris. if found too much particles or dark oil condition please perform flushing & change oil immediately",
    recommendationAus: null,
    active: 1
  },
  {
    id: 22,
    maintId: "N4000-C",
    issueParameter: "Cu High",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check actual drain mag plug Final drive pos 3, pos 4 and bevel gear center for wear particle.\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 23,
    maintId: "N4000-C",
    issueParameter: "Water Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of water contamination.\n- Check actual drain mag plug Final drive pos 3, pos 4 and bevel gear for wear particle.\n- Determine the source of water contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 24,
    maintId: "N4000-C",
    issueParameter: "Viscosity High",
    recommendationIdn: "RECOMMENDATION\n- Suggest to keep monitoring magnetic plug for debris\n- Check for possible particle debris was found\n- Suggest to change the oil, flush the compartment, and fill with oil according to the oil recommended by THIESS Standard Lubricant\n- Make sure to used correct type of oil",
    recommendationAus: null,
    active: 1
  },
  {
    id: 25,
    maintId: "N4000-F",
    issueParameter: "Viscosity High",
    recommendationIdn: "RECOMMENDATION\n- Suggest to keep monitoring magnetic plug for debris\n- Check for possible particle debris was found\n- Suggest to change the oil, flush the compartment, and fill with oil according to the oil recommended by THIESS Standard Lubricant\n- Make sure to used correct type of oil",
    recommendationAus: "REQUIRED ACTIONS:\n > Resample to confirm oil condition.\n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 26,
    maintId: "N4000-F",
    issueParameter: "Dirt & Water Contamina",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug  bevel gear Front for wear particle.\n- Determine the source of dirt contamination\n- Open cover to check inner part condition\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 27,
    maintId: "N4000-F",
    issueParameter: "Water Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of water contamination.\n- Check actual drain mag plug Final drive pos 1, pos 2 and bevel gear for wear particle.\n- Determine the source of water contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: "REQUIRED ACTIONS:\n  > Inspect duo-cone seals & breathers for leaks & condition. \n > Clean and flush sample port and resample. Hold sample to light and check \n bottle for visible water, if seen change oil.  \n > If no water visible send sample to lab to confirm oil condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 28,
    maintId: "N4000-F",
    issueParameter: "Oil Contamination",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Suggest to do kidney loop or change oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 29,
    maintId: "N4000-F",
    issueParameter: "Dirt Contamination 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 30,
    maintId: "N4000-F",
    issueParameter: "Dirt Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug Final drive pos 1, pos 2 and bevel gear for wear particle.\n- Determine the source of dirt contamination\n- Check abnormal noise during operation.\n- Perform kidneyloop filtering to remove contamination",
    recommendationAus: null,
    active: 1
  },
  {
    id: 31,
    maintId: "N4000-F",
    issueParameter: "PQ Increase 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Drain and flush compartment \n > Check mag-plug.\n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 32,
    maintId: "N4000-F",
    issueParameter: "Fe High 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 33,
    maintId: "N4000-F",
    issueParameter: "Fe High 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Check differential, left and right final drive mag-plugs. \n > Check breathers are in place, secure and in good condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section`",
    active: 1
  },
  {
    id: 34,
    maintId: "N4000-RE",
    issueParameter: "Water Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of water contamination.\n- Check actual drain mag plug Final drive pos 5, pos 6 and bevel gear for wear particle.\n- Determine the source of water contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 35,
    maintId: "N4000-RE",
    issueParameter: "Fe & PQ Increase",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 36,
    maintId: "N4000-RE",
    issueParameter: "High PC & PQ",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Clean and flush sample port and resample to confirm oil condition.  \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 37,
    maintId: "N4000-RE",
    issueParameter: "PQ HIGH",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n  > Inspect differential / final drive filter for debris / contamination. \n > Check differential, left and right final drive mag-plugs. \n > Check breathers are in place, secure and in good condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 38,
    maintId: "N4000-RE",
    issueParameter: "Dirt Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug Both final drive  and bevel gear for wear particle.\n- Determine the source of dirt contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 39,
    maintId: "N4000-RE",
    issueParameter: "Viscosity High",
    recommendationIdn: "RECOMMENDATION\n- Suggest to keep monitoring magnetic plug for debris\n- Check for possible particle debris was found\n- Suggest to change the oil, flush the compartment, and fill with oil according to the oil recommended by THIESS Standard Lubricant\n- Make sure to used correct type of oil",
    recommendationAus: null,
    active: 1
  },
  {
    id: 40,
    maintId: "N4000-RE",
    issueParameter: "Fe High ",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check magnetic plug Differential and BOTH Final Drive for debris\n- Check seal, gasket and breather from possible leak and blocked\n- Check abnormal noise during inspection\n- Perform  kidney loop filtering or change oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 41,
    maintId: "N4000-RE",
    issueParameter: "C-C-C-C|Dirt & Water Contamina",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt contamination.\n- Check actual drain mag plug  bevel gear rear for wear particle.\n- Determine the source of dirt contamination\n- Open cover to check inner part condition\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 42,
    maintId: "N4000-RE",
    issueParameter: "Viscosity Oil Low 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Discuss with site maintenance leadership team if leaking \n compartment should be replaced or resealed. \n > Drain and flush compartment.  \n  \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 43,
    maintId: "N6000",
    issueParameter: "Water Contamination 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS: :\n > Check oil sample for water separation or milky oil.  \n > Inspect BRAKE tank for cracks, missing cap, damage/missing breathers  \n > Ensure pump intake lines are in good condition and all clamps and fittings are tight.\n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 44,
    maintId: "N6000",
    issueParameter: "Water Contamination 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS: :\n > Check oil sample for water separation or milky oil.  \n > Inspect BRAKE tank for cracks, missing cap, damage/missing breathers  \n > Ensure pump intake lines are in good condition and all clamps and fittings are tight.\n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 45,
    maintId: "N6000",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check and filter cut for debris if available\n- Check for possible brake system low performance\n- Check for possible high frequency of brake usage\n- Suggest to check for possible bad oil condition. Suggest to change the oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 46,
    maintId: "N6000",
    issueParameter: "Wear Metal Increase-",
    recommendationIdn: "RECOMMENDATION\n- Check magnetic plug and filter cut for debris\n- Check for possible brake system low performance\n- Check for possible high frequency of brake usage\n- Suggest to check for possible bad oil condition. Suggest to change the oil if found bad oil condition",
    recommendationAus: null,
    active: 1
  },
  {
    id: 47,
    maintId: "N0500",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: "RECOMMENDATION\n- Check oil level. Inspect for possible leaks\n- Check oil condition\n- Check for possible seal and gasket for failure or gasket\n- Make sure to used correct type of oil",
    recommendationAus: null,
    active: 1
  },
  {
    id: 48,
    maintId: "N3300",
    issueParameter: "PQ HIGH",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Drain and flush compartment. \n \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 49,
    maintId: "N3300",
    issueParameter: "Viscosity Oil Low 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:,\n > Check if oil level is exceeding maximum capacity, if overfilled drain to \n correct level. \n > Recheck circle drive oil level in 50 SMU.",
    active: 1
  },
  {
    id: 50,
    maintId: "N3300-F",
    issueParameter: "Cu & PQ  HIGH",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 51,
    maintId: "N3300-F",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Drain and flush compartment. \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 53,
    maintId: "N3300-F",
    issueParameter: "Cu & Fe HIGH",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 54,
    maintId: "N3300-RE",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Drain and flush compartment. \n \nRecord all work details carried out / findings in the AFTER MAINTENANCE REMARKS section",
    active: 1
  },
  {
    id: 55,
    maintId: "N1000",
    issueParameter: "Wear Metal Increase 1",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop due to abrasion widens the gap between the ring and liner\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check for any abnormal condition when engine operation (High Temp, Noisy, or etc)\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: null,
    active: 1
  },
  {
    id: 56,
    maintId: "N1000",
    issueParameter: "Fuel Dilution 2",
    recommendationIdn: "RECOMMENDATION\nPositive fuel dilution has detected, but still below OEM limit. Keep monitoring until next oil sample result",
    recommendationAus: null,
    active: 1
  },
  {
    id: 57,
    maintId: "N1000",
    issueParameter: "Coolant Contamination 1",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil condition has transform to milky due to water/coolant contamination\n- Monitoring coolant and oil level, reported if found abnormal level or abnormal top up oil/coolant\n- Check for possible coolant leaks from Jacket Water, Cracked Cylinder Head, Leaks on Water Pump Seal, Oil Cooler Leaks, or etc\n- Check for possible white smoke or abnormal smoke are found\n- Check for possible engine operation at high temperature engine operation due to cooling system not working properly \n- Keep monitoring magnetic plug and filter cut for debris to monitoring for possible high component wear",
    recommendationAus: "ACTION REQUIRED :\n > Check coolant header tank with a bright flashlight for signs of oil entry e.g. \n oil slick on top of coolant,  \n > Pressurise coolant system and check for leaks \n > Drain a sample of oil from bottom of sump and check for coolant,  \n > Check water pump tell tales for leaks,  \n \n If leak detected: \n > Flush and replace oil post repair\n  \n If no leak detected \n > Clean and flush sample port and resample to confirm oil condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 58,
    maintId: "N1000",
    issueParameter: "Fuel Dilution 1",
    recommendationIdn: "Recommendation :\n- Check oil condition for possible contaminated with fuel \n- Check fuel system for possible leaks(included Fuel Transfer Pump Seal, fuel lines, incjectors,fuel supply manifold, etc)\n- Check for possible fuel system malfunction\n- Perform cut out injectors to check possible missfired\n- Pressurize test fuel system\n- Check the exhaust smoke condition for possible excessive black or white smoke",
    recommendationAus: "REQUIRED ACTIONS:\n > Investigate fuel system for leaks \n \n If leak detected: \n > Replace oil post repair \n \n If no leak detected at injectors, lines or valves  \n > Clean and flush sample port and resample to confirm oil condition. \n \n Note: Refer to engine OEM manual for process.\n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section`",
    active: 1
  },
  {
    id: 59,
    maintId: "N1000",
    issueParameter: "Dirt Contamination 1",
    recommendationIdn: "Recommendation \n- Check external engine oil leak\n- Check air induction system for leakage or restricted, tighten all clamps and connections\n- Clean up or replace air cleaner,\n- Check filter cut and mag plug for particles.",
    recommendationAus: "REQUIRED ACTIONS:\n > Check intake system for leaks, loose clamps, filter seal points in airbox \n > Check pre-cleaner condition \n > Check integrity of intake pipes/elbows \n > Check engine breather/dipstick/fill point for dirt entry \n > Clean and flush sample port and resample to confirm oil condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 60,
    maintId: "N1000",
    issueParameter: "High Oxidation 2",
    recommendationIdn: "Recommendation :\n- Check oil condition for possible contaminated with fuel \n- Check external engine oil leak\n- Check for any abnormal condition when engine operation (High Temp, Noisy, or etc)\n- Check magnetic plug and filter cut to monitoring component wear\n- Check for posssible engine ove heating.\n- Check radiator & cooling system condition for possible restricted or leaks\n- Clean up and wash the radiator finns / core",
    recommendationAus: null,
    active: 1
  },
  {
    id: 61,
    maintId: "N1000",
    issueParameter: "High Soot 1",
    recommendationIdn: "RECOMMENDATION\n- Check system for any restriction, loose/damage\n- Check Breather for any blockage, clean up if required\n- Check engine oil pressure. Check for possible engine low performance\n- Check Air filter, Clean or replace if necessary if found plugged or too much dirt\n- Check Fuel System components for any malfunction and check engine for possible abnormal smoke\n- Maintain the soot level, because too much soot in the oil it can be causing oil filter plugging",
    recommendationAus: null,
    active: 1
  },
  {
    id: 62,
    maintId: "N1000",
    issueParameter: " Pb High",
    recommendationIdn: "RECOMMENDATION,\n- Check oil level & condition for   contaminated.\n- Check external engine oil leak\n- Check seal and gasket for failure\n- Check filter cut and mag plug for particles",
    recommendationAus: "REQUIRED ACTIONS:\nAt half oil change interval: \n> Check oil operating temperature \n> Check oil pressure. \n> Clean and flush sample port and resample. \n> Perform filter cut and check for debris. \nNote: If necessary, request filtergram for sample. \n\n\nRecord actions and findings in complete tab",
    active: 1
  },
  {
    id: 63,
    maintId: "N1000",
    issueParameter: "Cu High 1",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check magnetic plug and filter cut to monitoring component wea",
    recommendationAus: "REQUIRED ACTIONS : \n > Cut and Inspect filter For debris\n > Check engine oil pressure.\n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 64,
    maintId: "N1000",
    issueParameter: "Fuel Dilution 3",
    recommendationIdn: "Recommendation :\n- Check oil condition for possible contaminated with fuel \n- Check fuel system for possible leaks(included Fuel Transfer Pump Seal, fuel lines, incjectors,fuel supply manifold, etc)\n- Check for possible fuel system malfunction\n- Perform cut out injectors to check possible missfired\n- Pressurize test fuel system\n- Check the exhaust smoke condition for possible excessive black or white smoke\n- Check for possible seal leaks on turbo bearing, Check for possible turbo bearing wear, and Check Turbocharger operation (end play) & Lubrication Lines\n- Check air induction system for possible leaks or restricted, tighten all clamps & connections",
    recommendationAus: null,
    active: 1
  },
  {
    id: 65,
    maintId: "N1000",
    issueParameter: "High Soot 2",
    recommendationIdn: "Recommendation :\n- Check external engine oil leak\n- Check air induction system for leakage or restricted, tighten all clamps and connections\n- Clean up or replace air cleaner,\n- Check exhaust lines for leaks or restricted\n-  Check turbocharger condition, operation, and bearing endplay \n- Check filter cut and mag plug for particles.\n-  Check engine Operating Temperature.\n-  Ensure all injectors function correctly\n- Check fuel system for working properly\n- Check engine oil pressure\n- Check blowby pressure",
    recommendationAus: null,
    active: 1
  },
  {
    id: 66,
    maintId: "N1000",
    issueParameter: "Coolant Contamination 2",
    recommendationIdn: "RECOMMENDATION :  \n- Check oil Level for overfill & oil condition for milky or contaminated with coolant. Drain & flush if found any bad condition.\n- Check for possible bubble in coolant\n- Pressurize the cooling system to check coolant leaks\n- Check vissually cooling system for possible leaks( included water pump, oil cooler, cylinder head gaskets, coolant lines,turbochargers, etc)\n- Resample after 100 hours operation",
    recommendationAus: "REQUIRED ACTIONS:\n > Invite OEM for further investigations. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 67,
    maintId: "N1000",
    issueParameter: "Fuel Dilution 4",
    recommendationIdn: "RECOMMENDATION\n- Check for Possible engine low performance\n- Check Duty Cycle of the Engine/Machine. For engines operating normally, the machine application or the duty cycle may be contributing to unacceptable fuel dilution : Engines with higher idle time, Engines with higher fuel and ambient temperatures, Engines that run cold, and Engines operating under light loads\n- Check for possible oil pressure drop and Check for possible fuel pressure drop\n- Check cylinder balancing, Fuel preassure, Cylinder compression with VTT and compare the result with OEM standard\n- Suggest to check for possible engine system malfunction",
    recommendationAus: null,
    active: 1
  },
  {
    id: 68,
    maintId: "N1000",
    issueParameter: "High Soot 3",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop, due to abrasion widens the gap between the ring and liner \n- Monitor oil filter cut, magnetic plug for debris, and Check Breather for any blockage, clean up if required\n- Check for possible engine overheated, and check oil level and condition. Check for possibility of formation of oil sludge\n- Check for air filter clogged, because clogged air filter decreasing the air supply, which increases the fuel air ratio and ultimately leads to increased soot formation\n- Check for possible rich air fuel ration and Check Turbocharger operation (endplay) & Lubrication Lines\n- Check Air filter, Clean or replace if necessary if found plugged or too much dirt\n- Check Fuel System components for any malfunction; test Nozzle if required (or checking engine cylinder separately) to make sure there is no uncomplete combustion process\n- Inspect engine from abnormal smoke and Check engine performance, or engine acceleration",
    recommendationAus: null,
    active: 1
  },
  {
    id: 69,
    maintId: "N1000",
    issueParameter: "Oil Contamination",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: null,
    active: 1
  },
  {
    id: 70,
    maintId: "N1000",
    issueParameter: "Viscosity High",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check system for any restriction, loose/damage\n- Check Breather for any blockage, clean up if required\n- Check engine oil pressure. Check for possible engine low performance\n- Check Air filter, Clean or replace if necessary if found plugged or too much dirt\n- Check Fuel System components for any malfunction and check engine for possible abnormal smoke\n- Maintain the soot level, because too much soot in the oil it can be causing oil filter plugging",
    recommendationAus: null,
    active: 1
  },
  {
    id: 71,
    maintId: "N1000",
    issueParameter: "Dirt Contamination 2",
    recommendationIdn: "RECOMMENDATION\n- Check oil leaked and inspect air induction system. Pressurize to make sure for possible leaks was found\n- Remove, Cut, and inspect oil filters. Check for possible particle debris was found\n- Check for possible seal and gasket failure or leaks\n- Inspect air system, check that it is free of obstructions and that there are no leaks. Check correct condition and adjustment of intake ducts, tighten clamps and elbows\n- Check for possible engine low performance",
    recommendationAus: "REQUIRED ACTIONS:\n > Pressurise the air induction system \n > Check boost pressure\n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 72,
    maintId: "N1000",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: "Recommendation,\n`- Check oil level and condition from possible contaminated with fuel\n- Check fuel transfer pump for leaks\n- Check Fuel System components for any malfunction; test Nozzle if required\n- Drain small amount of fuel & check for fuel quality (Color, dirt or abnormal sediment)\n- Check all air cleaner condition & its lock; ensure its properly fit to prevent dust to come inside engine\n- Test engine from possible low power\n",
    recommendationAus: null,
    active: 1
  },
  {
    id: 73,
    maintId: "N1000",
    issueParameter: "High Oxidation 1",
    recommendationIdn: "RECOMMENDATION\n- Check for posssible engine ove heating.\n- Check radiator & cooling system condition for possible restricted or leaks\n- Clean up and wash the radiator finns / core",
    recommendationAus: null,
    active: 1
  },
  {
    id: 74,
    maintId: "N1000",
    issueParameter: "Fuel Dilution 5",
    recommendationIdn: "RECOMMENDATION\n- Remove nozzle for pressurize test\n- Check for possible Excessive Leakage from the Unit Injector Tip or a Broken Unit Injector Tip\n- Check for possible Leaking Seals on the Body or the Sleeve of the Unit Injector\n- Check for possible nozzle for possible loose/not tightening correctly\n- Remove valve LH/RH valve cover. Pressurize and inspect fuel lines LH/RH cylinder head\n- Check fuel pressure",
    recommendationAus: null,
    active: 1
  },
  {
    id: 75,
    maintId: "N1000",
    issueParameter: "Viscosity Oil Low 2",
    recommendationIdn: "RECOMMENDATION\n- Check for Possible engine low performance\n- Check for possible fuel system malfunction and Checking Fuel System Pressure\n- Check for possible there is O-Ring Injectors or Injectors Cover sleeves fails\n- Check for possible leaking shaft seal on the fuel transfer pump\n- Check for possible oil pressure drop and Check for possible fuel pressure drop\n- Check cylinder balancing, Fuel preassure, Cylinder compression, and compare the result with OEM standard\n- Suggest to check for possible engine system malfunction\n- Check magnetic plug and filter cut for debris",
    recommendationAus: null,
    active: 1
  },
  {
    id: 76,
    maintId: "N1000",
    issueParameter: "INFRARED RESULT HIGH 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Take engine download,  \n > Check download for historical overheating, high crankcase pressure and \n turbo boost pressure faults. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 77,
    maintId: "N1000",
    issueParameter: "Al Increased",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop due to abrasion widens the gap between the ring and liner\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: "> Check download for historical overheating, high crankcase pressure and",
    active: 1
  },
  {
    id: 78,
    maintId: "N1000",
    issueParameter: "Water Contamination 2",
    recommendationIdn: "Recommendation,\n- Check oil level & condition (From possible too low or too high)\n- Check all air cleaner condition & its lock; ensure its properly fit to prevent dust to come inside engine\n- Check coolant condition (dark color may indicated coolant has been contaminated) ; Cu & N high may indicated cooler failed\n- Check for any oil leakage (seals, or gasket etc); oil leakage maybe sign of contaminaton entry point\n- Check for possible coolant leak into engine oil (waterpump, gasket cylinder head, oil cooler)\n- Resample oil to monitor Na (when oil hours reach 100/250 hrs)",
    recommendationAus: null,
    active: 1
  },
  {
    id: 79,
    maintId: "N1000",
    issueParameter: " Pb High 2",
    recommendationIdn: "RECOMMENDATION :\n- Check possible for air system ( Cleaned up air cleaner & housing Check Air Intake & Exhaust Gas System for any restriction loose/damage)\n- Check for possible oil pressure drop. Check engine oil pressure (Hi Idle 1800 RPM Oil Pressure between 275 - 600 KPa or 40 - 88 PSi and Lo Idle 600 - 800 RPM 100 KPa 15 PSi)\n- Check for possible engine low performance\n- Check oil condition and check for possible particle debris\n- Check magnetic plug and filter cut, Monitor filter cut for foreign material.\n- Check engine breather for possible excessive blowby",
    recommendationAus: null,
    active: 1
  },
  {
    id: 80,
    maintId: "N1000",
    issueParameter: "Cu High 2",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop. Check engine oil pressure (Hi Idle 1800 RPM Oil Pressure between 275 - 414 KPa or 40 - 60 PSi and Lo Idle 600 - 800 RPM 68 KPa 10 PSi)\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: "REQUIRED ACTIONS:\n > Cut and Inspect filter at half engine oil change interval \n > Drain and flush sample port and resample to confirm oil condition \n > Check engine oil pressure.\n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 81,
    maintId: "N1000",
    issueParameter: "Fe Increase 1",
    recommendationIdn: "RECOMMENDATION\n- Check for possible oil pressure drop\n- Check for possible engine low performance\n- Check for possible any engine system malfunction\n- Check for any abnormal condition when engine operation (High Temp, Noisy, or etc)\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: "REQUIRED ACTIONS:\n > Cut and Inspect filter at half engine oil change interval \n > Drain and flush sample port and resample to confirm oil condition \n > Check engine oil pressure. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 82,
    maintId: "N1000",
    issueParameter: "Fe High & Dirt Entry",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Cut and Inspect filter at half engine oil change interval \n > Check engine oil pressure. \n > Check intake system for leaks, loose clamps, filter seal points in airbox \n > Check pre-cleaner condition \n > Check integrity of intake pipes/elbows \n > Check engine breather/dipstick/fill point for dirt entry \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 83,
    maintId: "N1000",
    issueParameter: "PQ HIGH 1",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Cut and Inspect filter at half engine oil change interval \n > Drain and flush sample port and resample to confirm oil condition \n > Check engine oil pressure. \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 84,
    maintId: "N1000",
    issueParameter: "Wear Metal Increase & soot",
    recommendationIdn: "RECOMMENDATION\n- Check system for any restriction, loose/damage\n- Check Breather for any blockage, clean up if required\n- Check engine oil pressure. Check for possible engine low performance\n- Check Air filter, Clean or replace if necessary if found plugged or too much dirt\n- Check Fuel System components for any malfunction and check engine for possible abnormal smoke\n- Check for any abnormal condition when engine operation (High Temp, Noisy, or etc)\n- Maintain the soot level, because too much soot in the oil it can be causing oil filter plugging\n- Check magnetic plug and filter cut to monitoring component wear",
    recommendationAus: null,
    active: 1
  },
  {
    id: 85,
    maintId: "N1000",
    issueParameter: "Fe & PQ Increase",
    recommendationIdn: "RECOMMENDATION,\n- Check oil level & condition for dark or contaminated.\n- Check external engine oil leak\n- Check seal and gasket for failure\n- Inspect air cleaner & engine breather from plugged, cleaned up or replace if required \n- Check filter cut and mag plug for particles.\n-  Check engine oil pressure.",
    recommendationAus: "REQUIRED ACTIONS:\n > Cut and Inspect filter at half engine oil change interval \n > Drain and flush sample port and resample to confirm oil condition \n > Check engine oil pressure. \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 86,
    maintId: "N1000",
    issueParameter: "Oil Interchanged",
    recommendationIdn: "REQUIRED ACTIONS:\n > Clean and flush sample port and resample to confirm oil condition.  \n\n\nRecord actions and findings in complete tab",
    recommendationAus: "REQUIRED ACTIONS:\n  > Clean and flush sample port and resample to confirm oil condition.  \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 87,
    maintId: "N1000",
    issueParameter: "High Oxidation 3",
    recommendationIdn: "`---------------------------------------------------\nRecommendation,\n`- Check oil level and condition from contaminated with fuel\n- Check magnetic screen, magnetic plug, and filter cut for debris\n- Check all air cleaner condition & its lock; ensure its properly fit to prevent dust to come inside engine\n- Check engine oil pressure and Check for unusual/excessive noise during operation\n- Check fuel transfer pump for leaks\n- Drain small amount of fuel & check for fuel quality (Color, dirt or abnormal sediment)\n- Test engine from possible low power\n- Drain small amount of oil & check for any visible particles/debris. if found too much particles please perform flushing & change oil immediately",
    recommendationAus: null,
    active: 1
  },
  {
    id: 88,
    maintId: "N1000",
    issueParameter: "Water Contamination 1",
    recommendationIdn: "Recommendation,\n- Check oil level & condition (From possible too low or too high)\n- Check all air cleaner condition & its lock; ensure its properly fit to prevent dust to come inside engine\n- Check coolant condition (dark color may indicated coolant has been contaminated) ; Cu & Na high may indicated cooler failed\n- Check for any oil leakage (seals, or gasket etc); oil leakage maybe sign of contaminaton entry point\n- Check for possible coolant leak into engine oil (waterpump, gasket cylinder head, oil cooler)",
    recommendationAus: "REQUIRED ACTIONS:\n > Inspect seals, covers and breathers that may allow water to enter. \n > Clean and flush sample port and resample. Hold sample to light and check \n bottle for visible water or milky oil, if seen, change oil. \n > If no water visible send sample to lab to confirm oil condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 89,
    maintId: "N1000",
    issueParameter: "Viscosity Oil Low 3 (Volvo Medium Truck)",
    recommendationIdn: "RECOMMENDATION\nPositive fuel dilution has detected, but still below OEM limit. Keep monitoring until next oil sample result",
    recommendationAus: null,
    active: 1
  },
  {
    id: 90,
    maintId: "N1000",
    issueParameter: "PQ HIGH 2",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Conduct valve and camshaft inspection \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 91,
    maintId: "N5000-L",
    issueParameter: "Oil Contamination",
    recommendationIdn: "RECOMMENDATION\n- Suggest to keep monitoring magnetic plug for debris\n- Check for possible particle debris was found\n- Check for possible any leaks and abnormal noise was found\n- Suggest to make sure for possible incorrect type of oil was used",
    recommendationAus: null,
    active: 1
  },
  {
    id: 92,
    maintId: "N5000-L",
    issueParameter: "PC HIGH",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n oil has been changed at last service: \n > No action required by fitters,  close out work order.",
    active: 1
  },
  {
    id: 93,
    maintId: "N5000-L",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check duo cone seal from possible leak was found\n- Check housing and plug from possible leak and crack\n- Check magnetic plug for debris\n- Check abnormal noise",
    recommendationAus: null,
    active: 1
  },
  {
    id: 94,
    maintId: "N5000-L",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n > Investigate compartment transfer, mark oil level on final drive and \n transmission and check in 50 SMU. \n > If transfer is confirmed, reseal as required. \n > Resample to confirm oil condition. \n > Drain and flush compartment. \n \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 95,
    maintId: "N5000-L",
    issueParameter: "Fe High",
    recommendationIdn: null,
    recommendationAus: "REQUIRED ACTIONS:\n> Take resample to confirm oil condition. \n> Check final drive mag-plugs. \n> Inspect duo-cone seal for leaks \n> Check breathers are in place, secure and in good condition. \n \nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 96,
    maintId: "N5000-LC",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check duo cone seal from possible leak was found\n- Check housing and plug from possible leak and crack\n- Check magnetic plug for debris\n",
    recommendationAus: null,
    active: 1
  },
  {
    id: 97,
    maintId: "N5000-LF",
    issueParameter: "Water Contamination",
    recommendationIdn: "Recommendation:\n- Check oil level and oil condition for dark or contaminated.\n- Check duo seals and gaskets for leak and possible the source of dirt and water contamination.\n- Check actual drain mag plug Final drive pos 1  for wear particle.\n- Determine the source of dirt and water contamination\n- Check abnormal noise during operation.\n- Drain, flush and replace the oil to ensure no residual contamintion left",
    recommendationAus: null,
    active: 1
  },
  {
    id: 98,
    maintId: "N5000-FR",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check duo cone seal from possible leak was found\n- Check housing and plug from possible leak and crack\n- Check magnetic plug for debris\n- Check abnormal noise",
    recommendationAus: null,
    active: 1
  },
  {
    id: 99,
    maintId: "N5000-LF",
    issueParameter: "Viscosity Oil Low",
    recommendationIdn: "RECOMMENDATION\n- Suggest to keep monitoring magnetic plug for debris\n- Suggest to change the oil, flush the compartment, and fill with oil according to the oil recommended by THIESS Standard Lubricant\n- Make sure to used correct type of oil",
    recommendationAus: "REQUIRED ACTIONS:\n > Investigate compartment transfer, mark oil level on differential, hydraulics  and transmission and check 50 SMU. If transfer is confirmed, discuss with site maintenance leadership team if leaking compartment should be replaced or resealed. \n > Resample oil to confirm oil condition.  \n > Drain and flush compartment.\n\nRecord all work details carried out / findings in the “AFTER MAINTENANCE REMARKS” section",
    active: 1
  },
  {
    id: 100,
    maintId: "N5000-LF",
    issueParameter: "Wear Metal Increase",
    recommendationIdn: "RECOMMENDATION\n- Check oil level and condition\n- Check duo cone seal from possible leak was found\n- Check housing and plug from possible leak and crack\n- Check magnetic plug for debris\n- Check abnormal noise",
    recommendationAus: null,
    active: 1
  }
];
