import random
import string
import argparse

# Prerequisites : need `python` on you local machine
# HOW TO USE :
# the following script generates a random string of fixed-length letters and numbers
#
# to launch the script just type
# python get_random_alphanumeric_string.py 10
#
# without parameter shows help


# read "len" size from command line
parser = argparse.ArgumentParser()
parser.add_argument("length", type=int,
                    help="length size of random password")
parser.add_argument("-v", "--verbose", action="store_true",
                    help="increase output verbosity")
args = parser.parse_args()


def get_random_alphanumeric_string(length):
    """
    generate randoom alphanumeric string
    """
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join((random.choice(letters_and_digits)
                          for i in range(length)))
    print(f"Random alphanumeric String is: {result_str}")


get_random_alphanumeric_string(args.length)
